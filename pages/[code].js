import React from 'react';
import pool from '../lib/db';
import { validateUrlSecurity, getSecurityHeaders, logSecurityEvent } from '../lib/security';
import { t } from '../lib/i18n';

export default function RedirectPage({ url, code, securityBlocked, securityReason, locale }) {
    if (securityBlocked) {
        return (
            <div style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                margin: 0,
                background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)'
            }}>
                <div style={{
                    textAlign: 'center',
                    background: 'white',
                    padding: '3rem',
                    borderRadius: '1rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    maxWidth: '500px',
                    margin: '1rem'
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem', color: '#dc2626' }}>
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                            <line x1="12" y1="9" x2="12" y2="13"/>
                            <line x1="12" y1="17" x2="12.01" y2="17"/>
                        </svg>
                    </div>
                    <h1 style={{ color: '#dc2626', marginBottom: '1rem' }}>{t('securityWarning', locale)}</h1>
                    <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                        {t('securityMessage', locale)}
                    </p>
                    <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
                        <strong>{t('reason', locale)}：</strong>{securityReason}
                    </p>
                    <a href="/" style={{
                        background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        border: 'none',
                        borderRadius: '0.5rem',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontWeight: 500,
                        transition: 'all 0.2s'
                    }}>
                        {t('backToHome', locale)}
                    </a>
                </div>
            </div>
        );
    }

    return (
        <RedirectWithCountdown url={url} code={code} locale={locale} />
    );
}

function RedirectWithCountdown({ url, code, locale }) {
    const [countdown, setCountdown] = React.useState(5);
    const [shouldRedirect, setShouldRedirect] = React.useState(false);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setShouldRedirect(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    React.useEffect(() => {
        if (shouldRedirect) {
            window.location.href = url;
        }
    }, [shouldRedirect, url]);

    const handleRedirect = () => {
        setShouldRedirect(true);
    };

    const handleCancel = () => {
        window.location.href = '/';
    };

    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            margin: 0,
            background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)'
        }}>
            <div style={{
                textAlign: 'center',
                background: 'white',
                padding: '3rem',
                borderRadius: '1rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                maxWidth: '600px',
                margin: '1rem'
            }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem', color: '#2563eb' }}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>
                </div>
                <h1 style={{ color: '#1e293b', marginBottom: '1rem', fontSize: '1.5rem' }}>
                    {t('redirectTitle', locale)}
                </h1>
                <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {t('redirectWarning', locale)}
                </p>
                <div style={{
                    background: '#f1f5f9',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    marginBottom: '1.5rem',
                    wordBreak: 'break-all'
                }}>
                    <a href={url} target="_blank" rel="noopener noreferrer" style={{
                        color: '#2563eb',
                        textDecoration: 'none',
                        fontWeight: 500
                    }}>
                        {url}
                    </a>
                </div>
                <p style={{ color: '#f59e0b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.5rem', verticalAlign: 'middle' }}>
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    {t('redirectNotice', locale)}
                </p>
                <div style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    color: '#2563eb',
                    marginBottom: '1.5rem'
                }}>
                    {countdown}
                </div>
                <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '0.875rem' }}>
                    {countdown} {t('redirectCountdown', locale)}
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
                    <button
                        onClick={handleRedirect}
                        style={{
                            background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                            color: 'white',
                            padding: '0.75rem 1.5rem',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        {t('redirectButton', locale)}
                    </button>
                    <button
                        onClick={handleCancel}
                        style={{
                            background: '#f1f5f9',
                            color: '#64748b',
                            padding: '0.75rem 1.5rem',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        {t('redirectCancel', locale)}
                    </button>
                </div>
                
                {/* 联系信息 */}
                <div style={{ 
                    borderTop: '1px solid #e2e8f0',
                    paddingTop: '1.5rem',
                    textAlign: 'center'
                }}>
                    <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                        {locale === 'zh' ? '如有问题、投诉、举报或反馈，请联系我们：' : 'For questions, complaints, reports, or feedback, contact us:'}
                    </p>
                    <a 
                        href="mailto:admin@userhali.com" 
                        style={{ 
                            color: '#2563eb', 
                            textDecoration: 'none',
                            fontWeight: 500,
                            fontSize: '0.875rem'
                        }}
                    >
                        admin@userhali.com
                    </a>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps({ params, res, req }) {
    const c = params.code;
    
    // 获取语言偏好
    const acceptLanguage = req.headers['accept-language'] || '';
    const locale = acceptLanguage.includes('zh') ? 'zh' : 'en';
    
    // 查询链接
    const r = await pool.query('SELECT url FROM links WHERE code=$1', [c]);
    if (!r.rowCount) { 
        res.statusCode = 404; 
        return { props: { locale } }; 
    }
    
    const url = r.rows[0].url;
    
    // 重定向前再次进行安全检查
    const securityCheck = validateUrlSecurity(url);
    if (!securityCheck.isValid) {
        logSecurityEvent('BLOCKED_REDIRECT', {
            code: c,
            url: url,
            reason: securityCheck.reason,
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            userAgent: req.headers['user-agent']
        });
        
        return { 
            props: { 
                url,
                code: c,
                securityBlocked: true,
                securityReason: securityCheck.reason,
                locale
            } 
        };
    }
    
    // 更新点击统计
    await pool.query('UPDATE links SET clicks=clicks+1,last_clicked=now() WHERE code=$1', [c]);
    
    // 添加安全头部
    const securityHeaders = getSecurityHeaders();
    Object.entries(securityHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
    });
    
    // 添加额外的重定向安全头部
    res.setHeader('X-Redirect-Reason', 'Short link redirect');
    res.setHeader('X-Original-URL-Length', url.length.toString());
    
    // 记录重定向事件
    logSecurityEvent('REDIRECT', {
        code: c,
        url: url,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        userAgent: req.headers['user-agent']
    });
    
    return { 
        props: { 
            url,
            code: c,
            securityBlocked: false,
            locale
        } 
    };
}
