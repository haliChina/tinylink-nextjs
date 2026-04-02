import { t } from '../lib/i18n';

export default function Disclaimer({ locale }) {
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
                        {locale === 'zh' ? '免责声明' : 'Disclaimer'}
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '1rem' }}>
                        {locale === 'zh' ? '最后更新：2024年1月1日' : 'Last updated: January 1, 2024'}
                    </p>
                </div>

                <div style={{ lineHeight: 1.8, color: '#374151' }}>
                    {locale === 'zh' ? (
                        <>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                1. 服务性质
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                TinyLink 是一个免费的短链接服务，旨在为用户提供便捷的链接缩短功能。使用本服务即表示您同意本免责声明的所有条款。
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                2. 风险承担
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                用户使用本服务所产生的任何风险由用户自行承担。我们不对因使用本服务而导致的任何直接、间接、偶然、特殊或后果性损害负责，包括但不限于数据丢失、业务中断或其他经济损失。
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                3. 第三方链接
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                本服务生成的短链接可能指向第三方网站。我们对第三方网站的内容、隐私政策或做法不承担任何责任。用户访问第三方网站时应自行评估风险。
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                4. 服务可用性
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                我们努力确保服务的稳定性和可用性，但不保证服务不会中断或无错误。我们保留随时修改、暂停或终止服务的权利，无需事先通知。
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                5. 安全措施
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                虽然我们实施了安全措施来检测和阻止恶意链接，但我们不能保证能够检测到所有潜在的威胁。用户应保持警惕，避免点击可疑链接。
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                6. 联系我们
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                如果您对本免责声明有任何疑问，请通过以下方式联系我们：
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
                                1. Service Nature
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                TinyLink is a free URL shortening service designed to provide users with convenient link shortening functionality. By using this service, you agree to all terms of this disclaimer.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                2. Risk Assumption
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Any risks arising from the use of this service are assumed by the user. We shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use of this service, including but not limited to data loss, business interruption, or other economic losses.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                3. Third-party Links
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Short links generated by this service may point to third-party websites. We assume no responsibility for the content, privacy policies, or practices of third-party websites. Users should assess risks independently when visiting third-party websites.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                4. Service Availability
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                We strive to ensure service stability and availability, but do not guarantee that the service will be uninterrupted or error-free. We reserve the right to modify, suspend, or terminate the service at any time without prior notice.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                5. Security Measures
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                While we implement security measures to detect and block malicious links, we cannot guarantee detection of all potential threats. Users should remain vigilant and avoid clicking on suspicious links.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                6. Contact Us
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                If you have any questions about this disclaimer, please contact us through our contact information.
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