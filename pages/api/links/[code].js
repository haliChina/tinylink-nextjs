import pool from '../../../lib/db';
import { validateAdminAccess } from '../../../lib/auth';
const CODE = /^[A-Za-z0-9]{6,8}$/;
export default async function h(req, res) {
  const auth = validateAdminAccess(req, res);
  if (!auth.valid) {
    return res.status(401).json({ error: auth.error });
  }
  
  const { code } = req.query;
  if (!CODE.test(code)) return res.status(404).json({ error: 'Not found' });
  if (req.method === 'GET') {
    const r = await pool.query('SELECT code,url,clicks,created_at,last_clicked FROM links WHERE code=$1', [code]);
    if (!r.rowCount) return res.status(404).json({ error: 'Not found' });
    return res.json(r.rows[0]);
  }
  if (req.method === 'DELETE') {
    const r = await pool.query('DELETE FROM links WHERE code=$1', [code]);
    if (!r.rowCount) return res.status(404).json({ error: 'Not found' });
    return res.json({ deleted: true });
  }
  res.status(405).end();
}