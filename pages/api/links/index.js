import pool from '../../../lib/db';
import { isURL } from 'validator';
import { validateUrlSecurity, logSecurityEvent } from '../../../lib/security';
const CODE = /^[A-Za-z0-9]{6,8}$/;
export default async function h(req, res) {
  if (req.method === 'GET') {
    const r = await pool.query('SELECT code,url,clicks,created_at,last_clicked FROM links ORDER BY created_at DESC');
    return res.json({ links: r.rows });
  }
  if (req.method === 'POST') {
    const { url, code } = req.body;
    
    // 基础URL格式验证
    if (!isURL(url || '', { require_protocol: true })) {
      return res.status(400).json({ error: 'Invalid url' });
    }
    
    // 安全验证
    const securityCheck = validateUrlSecurity(url);
    if (!securityCheck.isValid) {
      logSecurityEvent('BLOCKED_URL_CREATION', {
        url: url,
        reason: securityCheck.reason,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        userAgent: req.headers['user-agent']
      });
      return res.status(400).json({ error: securityCheck.reason });
    }
    
    // 记录可疑但允许的URL
    if (url.toLowerCase().includes('login') || url.toLowerCase().includes('verify')) {
      logSecurityEvent('SUSPICIOUS_URL_ALLOWED', {
        url: url,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        userAgent: req.headers['user-agent']
      });
    }
    let c = code;
    if (c) {
      if (!CODE.test(c)) return res.status(400).json({ error: 'Invalid code' });
      const e = await pool.query('SELECT 1 FROM links WHERE code=$1', [c]);
      if (e.rowCount) return res.status(409).json({ error: 'Code exists' });
    } else {
      for (let i = 0; i < 5; i++) {
        c = Math.random().toString(36).slice(2, 10).substring(0, 8);
        if (!CODE.test(c)) continue;
        const e = await pool.query('SELECT 1 FROM links WHERE code=$1', [c]);
        if (!e.rowCount) break;
      }
    }
    await pool.query('INSERT INTO links(code,url) VALUES($1,$2)', [c, url]);
    return res.status(201).json({ code: c, url });
  }
  res.status(405).end();
}