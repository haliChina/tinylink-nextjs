function validateAdminAccess(req, res) {
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminPassword) {
        return { valid: false, error: 'Admin password not configured' };
    }
    
    const authHeader = req.headers['x-admin-password'];
    
    if (!authHeader) {
        return { valid: false, error: 'Admin password required' };
    }
    
    if (authHeader !== adminPassword) {
        return { valid: false, error: 'Invalid admin password' };
    }
    
    return { valid: true };
}

module.exports = { validateAdminAccess };
