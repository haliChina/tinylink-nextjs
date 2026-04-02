// URL安全验证工具 - 防止短链接被用作攻击跳板

// 危险协议黑名单
const DANGEROUS_PROTOCOLS = [
    'javascript:',
    'data:',
    'vbscript:',
    'file:',
    'ftp:',
    'jar:',
    'mailto:',
    'tel:',
    'sms:',
];

// 内网地址模式
const PRIVATE_IP_PATTERNS = [
    /^https?:\/\/localhost(:\d+)?(\/|$)/i,
    /^https?:\/\/127\.\d+\.\d+\.\d+(:\d+)?(\/|$)/i,
    /^https?:\/\/10\.\d+\.\d+\.\d+(:\d+)?(\/|$)/i,
    /^https?:\/\/172\.(1[6-9]|2\d|3[01])\.\d+\.\d+(:\d+)?(\/|$)/i,
    /^https?:\/\/192\.168\.\d+\.\d+(:\d+)?(\/|$)/i,
    /^https?:\/\/\[::1\](:\d+)?(\/|$)/i,
    /^https?:\/\/\[fc00::\](:\d+)?(\/|$)/i,
    /^https?:\/\/\[fe80::\](:\d+)?(\/|$)/i,
];

// 恶意域名黑名单（可扩展）
const MALICIOUS_DOMAINS = [
    'evil.com',
    'malware.com',
    'phishing.com',
    'scam.com',
    // 可以根据需要添加更多
];

// 可疑关键词
const SUSPICIOUS_KEYWORDS = [
    'login',
    'signin',
    'verify',
    'secure',
    'account',
    'password',
    'bank',
    'paypal',
    'amazon',
    'apple',
    'microsoft',
    'google',
    'facebook',
    'twitter',
];

/**
 * 检查URL是否使用危险协议
 */
function hasDangerousProtocol(url) {
    const lowerUrl = url.toLowerCase().trim();
    return DANGEROUS_PROTOCOLS.some(protocol => lowerUrl.startsWith(protocol));
}

/**
 * 检查URL是否指向内网地址
 */
function isPrivateIP(url) {
    return PRIVATE_IP_PATTERNS.some(pattern => pattern.test(url));
}

/**
 * 检查域名是否在黑名单中
 */
function isMaliciousDomain(url) {
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.toLowerCase();
        return MALICIOUS_DOMAINS.some(domain => 
            hostname === domain || hostname.endsWith('.' + domain)
        );
    } catch {
        return true; // URL解析失败视为可疑
    }
}

/**
 * 检查URL是否包含可疑关键词
 */
function hasSuspiciousKeywords(url) {
    const lowerUrl = url.toLowerCase();
    return SUSPICIOUS_KEYWORDS.some(keyword => lowerUrl.includes(keyword));
}

/**
 * 检查URL长度是否异常
 */
function isUrlTooLong(url) {
    return url.length > 2048; // RFC 2616建议限制
}

/**
 * 检查URL是否包含编码的危险字符
 */
function hasEncodedDangerousChars(url) {
    const decoded = decodeURIComponent(url.toLowerCase());
    const dangerousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i,
        /data:\s*text\/html/i,
    ];
    return dangerousPatterns.some(pattern => pattern.test(decoded));
}

/**
 * 综合URL安全验证
 * @param {string} url - 要验证的URL
 * @returns {object} - { isValid: boolean, reason: string }
 */
function validateUrlSecurity(url) {
    // 基础检查
    if (!url || typeof url !== 'string') {
        return { isValid: false, reason: 'URL不能为空' };
    }

    const trimmedUrl = url.trim();

    // 协议检查
    if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
        return { isValid: false, reason: '只允许HTTP和HTTPS协议' };
    }

    // 危险协议检查
    if (hasDangerousProtocol(trimmedUrl)) {
        return { isValid: false, reason: '检测到危险协议，可能存在安全风险' };
    }

    // 内网地址检查
    if (isPrivateIP(trimmedUrl)) {
        return { isValid: false, reason: '不允许重定向到内网地址' };
    }

    // 恶意域名检查
    if (isMaliciousDomain(trimmedUrl)) {
        return { isValid: false, reason: '检测到恶意域名' };
    }

    // URL长度检查
    if (isUrlTooLong(trimmedUrl)) {
        return { isValid: false, reason: 'URL长度超过限制' };
    }

    // 编码危险字符检查
    if (hasEncodedDangerousChars(trimmedUrl)) {
        return { isValid: false, reason: 'URL包含可疑编码字符' };
    }

    // 可疑关键词警告（不阻止，但记录）
    if (hasSuspiciousKeywords(trimmedUrl)) {
        console.warn(`[SECURITY] Suspicious keywords detected in URL: ${trimmedUrl}`);
    }

    return { isValid: true, reason: 'URL安全验证通过' };
}

/**
 * 生成安全的重定向头部
 */
function getSecurityHeaders() {
    return {
        // 防止点击劫持
        'X-Frame-Options': 'DENY',
        // 防止MIME类型嗅探
        'X-Content-Type-Options': 'nosniff',
        // 启用XSS过滤
        'X-XSS-Protection': '1; mode=block',
        // 严格传输安全（仅HTTPS）
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        // 内容安全策略
        'Content-Security-Policy': "default-src 'self'",
        // 引荐策略
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        // 权限策略
        'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    };
}

/**
 * 记录安全事件
 */
function logSecurityEvent(event, details) {
    const timestamp = new Date().toISOString();
    console.log(`[SECURITY EVENT] ${timestamp} - ${event}:`, details);
    
    // 可以扩展为写入数据库或发送到安全监控系统
    // 例如：saveToSecurityLog({ timestamp, event, details });
}

// CommonJS导出
module.exports = {
    validateUrlSecurity,
    getSecurityHeaders,
    logSecurityEvent
};
