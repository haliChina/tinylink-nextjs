import { setAuthCookie, clearAuthCookie, validateAdminAccess } from '../../../lib/auth';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { password } = req.body;
        
        if (!password) {
            return res.status(400).json({ error: 'Password required' });
        }
        
        if (setAuthCookie(res, password)) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(401).json({ error: 'Invalid password' });
        }
    }
    
    if (req.method === 'DELETE') {
        clearAuthCookie(res);
        return res.status(200).json({ success: true });
    }
    
    if (req.method === 'GET') {
        const auth = validateAdminAccess(req, res);
        return res.status(200).json({ authenticated: auth.valid });
    }
    
    res.status(405).end();
}
