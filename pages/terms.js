import { t } from '../lib/i18n';

export default function Terms({ locale }) {
    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)',
            padding: '2rem 1rem'
        }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                background: 'white',
                borderRadius: '1rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                padding: '3rem'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '0.5rem'
                    }}>
                        {locale === 'zh' ? '用户协议' : 'Terms of Service'}
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '1rem' }}>
                        {locale === 'zh' ? '最后更新：2024年1月1日' : 'Last updated: January 1, 2024'}
                    </p>
                </div>

                <div style={{ lineHeight: 1.8, color: '#374151' }}>
                    {locale === 'zh' ? (
                        <>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                1. 服务条款接受
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                通过访问和使用 TinyLink 服务，您确认您已阅读、理解并同意受本用户协议的约束。如果您不同意这些条款，请不要使用我们的服务。
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                2. 服务描述
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                TinyLink 提供 URL 缩短服务，允许用户将长 URL 转换为更短、更易于分享的链接。我们还提供链接分析和管理功能。
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                3. 用户责任
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                用户同意不使用本服务进行任何非法活动，包括但不限于：传播恶意软件、进行钓鱼攻击、侵犯他人隐私、发布非法内容或侵犯知识产权。
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                4. 禁止用途
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                禁止将本服务用于以下用途：创建指向恶意网站的链接、传播垃圾邮件、进行欺诈活动、绕过安全措施或进行任何可能损害他人利益的行为。
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                5. 知识产权
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                TinyLink 的所有内容、功能和特征均为我们的知识产权。用户不得复制、修改、分发或创建基于我们服务的衍生作品。
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                6. 服务变更和终止
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                我们保留随时修改、暂停或终止服务的权利。我们可能会在合理的情况下终止用户的访问权限，包括违反本协议的条款。
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                7. 免责声明
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                服务按"现状"提供，我们不提供任何明示或暗示的保证。我们不保证服务的准确性、可靠性或可用性。
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                8. 责任限制
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                在任何情况下，我们对因使用或无法使用服务而导致的任何直接、间接、偶然、特殊或后果性损害不承担责任。
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                9. 协议修改
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                我们保留随时修改本协议的权利。修改后的协议将在网站上发布后立即生效。继续使用服务即表示您接受修改后的协议。
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                10. 联系信息
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                如果您对本用户协议有任何疑问，请通过以下方式联系我们：
                            </p>
                            <div style={{ 
                                background: '#f1f5f9', 
                                padding: '1rem', 
                                borderRadius: '0.5rem',
                                marginBottom: '1.5rem'
                            }}>
                                <p style={{ marginBottom: '0.5rem' }}>
                                    <strong>邮箱：</strong>admin@userhali.com
                                </p>
                                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                                    如有任何问题、投诉、举报或反馈，欢迎随时联系我们。
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                1. Acceptance of Terms
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                By accessing and using TinyLink services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                2. Service Description
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                TinyLink provides URL shortening services that allow users to convert long URLs into shorter, more shareable links. We also provide link analytics and management features.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                3. User Responsibilities
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Users agree not to use the service for any illegal activities, including but not limited to: spreading malware, conducting phishing attacks, violating privacy, publishing illegal content, or infringing intellectual property rights.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                4. Prohibited Uses
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                The service may not be used for: creating links to malicious websites, spreading spam, conducting fraudulent activities, bypassing security measures, or any behavior that may harm others' interests.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                5. Intellectual Property
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                All content, features, and functionality of TinyLink are our intellectual property. Users may not copy, modify, distribute, or create derivative works based on our services.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                6. Service Changes and Termination
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                We reserve the right to modify, suspend, or terminate the service at any time. We may terminate user access under reasonable circumstances, including violation of these terms.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                7. Disclaimer
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                The service is provided "as is" without any express or implied warranties. We do not guarantee the accuracy, reliability, or availability of the service.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                8. Limitation of Liability
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                In no event shall we be liable for any direct, indirect, incidental, special, or consequential damages arising from the use or inability to use the service.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                9. Agreement Modifications
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                We reserve the right to modify these terms at any time. Modified terms will become effective immediately upon posting on the website. Continued use of the service indicates acceptance of modified terms.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                10. Contact Information
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                If you have any questions about these Terms of Service, please contact us through our contact information.
                            </p>
                        </>
                    )}
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
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
                        {locale === 'zh' ? '返回首页' : 'Back to Home'}
                    </a>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps({ req }) {
    const acceptLanguage = req.headers['accept-language'] || '';
    const locale = acceptLanguage.includes('zh') ? 'zh' : 'en';
    
    return {
        props: {
            locale
        }
    };
}