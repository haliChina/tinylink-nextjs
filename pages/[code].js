import pool from '../lib/db';
export default () => null;
export async function getServerSideProps({ params, res }) {
    const c = params.code;
    const r = await pool.query('SELECT url FROM links WHERE code=$1', [c]);
    if (!r.rowCount) { res.statusCode = 404; return { props: {} }; }
    const url = r.rows[0].url;
    await pool.query('UPDATE links SET clicks=clicks+1,last_clicked=now() WHERE code=$1', [c]);
    res.writeHead(302, { Location: url }); res.end();
    return { props: {} };
}