// 国际化配置 - 中英双语支持
const translations = {
    zh: {
        // 通用
        siteName: 'TinyLink',
        siteDescription: '优雅的短链接服务',
        
        // 主页
        heroTitle: 'TinyLink',
        heroSubtitle: '优雅的短链接服务，让分享更简单',
        createLink: '创建短链接',
        destinationUrl: '目标网址',
        customCode: '自定义代码（可选）',
        createButton: '创建链接',
        creating: '创建中...',
        yourLinks: '您的链接',
        shortCode: '短代码',
        clicks: '点击次数',
        lastClicked: '最后点击',
        actions: '操作',
        stats: '统计',
        delete: '删除',
        noLinks: '还没有链接',
        createFirst: '在上方创建您的第一个短链接',
        
        // 跳转页面
        redirectTitle: '即将跳转到外部网站',
        redirectWarning: '您即将离开 TinyLink 并访问以下网站：',
        redirectNotice: '请注意：我们无法控制外部网站的内容或安全性。',
        redirectButton: '立即跳转',
        redirectCancel: '取消',
        redirectCountdown: '秒后自动跳转',
        securityCheck: '安全检查中...',
        
        // 法律页面
        disclaimer: '免责声明',
        terms: '用户协议',
        privacy: '隐私政策',
        
        // 页脚
        footerText: '使用 Next.js 和 Tailwind CSS 构建',
        
        // 联系信息
        contactUs: '联系我们',
        contactEmail: 'admin@userhali.com',
        contactDescription: '如有任何问题、投诉、举报或反馈，请通过以下方式联系我们：',
        feedbackDescription: '我们重视您的反馈，将不断改进我们的服务。',
        
        // 安全警告
        securityWarning: '安全警告',
        securityMessage: '此链接已被标记为潜在危险，为了您的安全，系统已阻止自动重定向。',
        reason: '原因',
        backToHome: '返回首页'
    },
    en: {
        // General
        siteName: 'TinyLink',
        siteDescription: 'Elegant URL shortening service',
        
        // Homepage
        heroTitle: 'TinyLink',
        heroSubtitle: 'Elegant URL shortening service for easier sharing',
        createLink: 'Create Short Link',
        destinationUrl: 'Destination URL',
        customCode: 'Custom Code (optional)',
        createButton: 'Create Link',
        creating: 'Creating...',
        yourLinks: 'Your Links',
        shortCode: 'Short Code',
        clicks: 'Clicks',
        lastClicked: 'Last Clicked',
        actions: 'Actions',
        stats: 'Stats',
        delete: 'Delete',
        noLinks: 'No links yet',
        createFirst: 'Create your first short link above',
        
        // Redirect page
        redirectTitle: 'Redirecting to External Website',
        redirectWarning: 'You are about to leave TinyLink and visit:',
        redirectNotice: 'Please note: We cannot control the content or security of external websites.',
        redirectButton: 'Continue',
        redirectCancel: 'Cancel',
        redirectCountdown: 'seconds until automatic redirect',
        securityCheck: 'Security check...',
        
        // Legal pages
        disclaimer: 'Disclaimer',
        terms: 'Terms of Service',
        privacy: 'Privacy Policy',
        
        // Footer
        footerText: 'Built with Next.js and Tailwind CSS',
        
        // Contact information
        contactUs: 'Contact Us',
        contactEmail: 'admin@userhali.com',
        contactDescription: 'For any questions, complaints, reports, or feedback, please contact us at:',
        feedbackDescription: 'We value your feedback and will continuously improve our services.',
        
        // Security warning
        securityWarning: 'Security Warning',
        securityMessage: 'This link has been flagged as potentially dangerous. For your safety, automatic redirect has been blocked.',
        reason: 'Reason',
        backToHome: 'Back to Home'
    }
};

// 获取浏览器语言或默认中文
function getLocale() {
    if (typeof window !== 'undefined') {
        const lang = navigator.language || navigator.userLanguage;
        return lang.startsWith('zh') ? 'zh' : 'en';
    }
    return 'zh'; // 服务端默认中文
}

// 获取翻译文本
function t(key, locale = null) {
    const currentLocale = locale || getLocale();
    return translations[currentLocale]?.[key] || translations.zh[key] || key;
}

module.exports = {
    translations,
    getLocale,
    t
};