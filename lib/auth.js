const COOKIE_NAME = 'admin_token';
const TOKEN_TTL = 60 * 60 * 24;

function generateToken() {
    const payload = Date.now().toString();
    const random = Math.random().toString(36).substring(2);
    return Buffer.from(`${payload}.${random}`).toString('base64');
}

function validateAdminAccess(req, res) {
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminPassword) {
        return { valid: false, error: 'Admin password not configured' };
    }
    
    const cookies = {};
    if (req.headers.cookie) {
        req.headers.cookie.split(';').forEach(cookie => {
            const [name, value] = cookie.trim().split('=');
            cookies[name] = value;
        });
    }
    
    const token = cookies[COOKIE_NAME];
    
    if (!token) {
        return { valid: false, error: 'Authentication required' };
    }
    
    try {
        const decoded = Buffer.from(token, 'base64').toString('utf-8');
        const [timestamp] = decoded.split('.');
        const tokenAge = Date.now() - parseInt(timestamp);
        
        if (tokenAge > TOKEN_TTL * 1000) {
            return { valid: false, error: 'Session expired' };
        }
        
        return { valid: true };
    } catch {
        return { valid: false, error: 'Invalid token' };
    }
}

function setAuthCookie(res, password) {
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (password !== adminPassword) {
        return false;
    }
    
    const token = generateToken();
    res.setHeader('Set-Cookie', `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Max-Age=${TOKEN_TTL}; SameSite=Strict`);
    return true;
}

function clearAuthCookie(res) {
    res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; HttpOnly; Max-Age=0`);
}

module.exports = { validateAdminAccess, setAuthCookie, clearAuthCookie };
