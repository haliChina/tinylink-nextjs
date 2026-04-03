import { t, getLocaleFromHeaders } from '../lib/i18n';

export default function Privacy({ locale }) {
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
                        {locale === 'zh' ? '隐私政策' : 'Privacy Policy'}
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '1rem' }}>
                        {locale === 'zh' ? '最后更新：2024年1月1日' : 'Last updated: January 1, 2024'}
                    </p>
                </div>

                <div style={{ lineHeight: 1.8, color: '#374151' }}>
                    {locale === 'zh' ? (
                        <>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                1. 信息收集
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                我们收集的信息包括：您创建的短链接、目标URL、访问统计数据（如点击次数、访问时间）、以及您的IP地址和浏览器信息。我们不会收集个人身份信息，除非您主动提供。
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                2. 信息使用
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                我们使用收集的信息来：提供和维护我们的服务、分析服务使用情况以改进用户体验、检测和防止滥用或欺诈行为、以及遵守法律义务。
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                3. 信息共享
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                我们不会出售、交易或以其他方式转让您的信息给第三方。我们可能在以下情况下共享信息：获得您的明确同意、为遵守法律要求、保护我们的权利和安全，或与帮助我们运营服务的可信合作伙伴共享。
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                4. 数据安全
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                我们实施了适当的技术和组织措施来保护您的信息免受未经授权的访问、使用、修改或披露。然而，没有任何互联网传输方法是100%安全的，我们不能保证绝对的安全性。
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                5. 数据保留
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                我们会保留您的信息以提供服务并遵守法律义务。当信息不再需要时，我们会安全地删除或匿名化处理。您可以随时请求删除您的链接和相关数据。
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                6. Cookie和跟踪技术
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                我们使用Cookie和类似技术来改善您的体验、分析使用模式并管理网站功能。您可以通过浏览器设置控制Cookie的使用。
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                7. 第三方服务
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                我们的服务可能包含指向第三方网站或服务的链接。我们对第三方的隐私做法不承担责任。我们建议您查看任何您访问的第三方网站的隐私政策。
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                8. 儿童隐私
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                我们的服务不面向13岁以下的儿童。我们不会故意收集13岁以下儿童的个人信息。如果我们发现收集了此类信息，我们会立即删除。
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                9. 隐私政策更新
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                我们可能会不时更新本隐私政策。任何更改都会在本页面上发布，我们会更新"最后更新"日期。我们建议您定期查看本政策以了解任何更改。
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                10. 联系我们
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                如果您对本隐私政策有任何疑问或担忧，请通过以下方式联系我们：
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
                                    如有任何问题、投诉、举报或反馈，欢迎随时联系我们。我们会尽快回复您的询问。
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                1. Information Collection
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                We collect information including: short links you create, target URLs, access statistics (such as click counts, access times), and your IP address and browser information. We do not collect personal identification information unless you voluntarily provide it.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                2. Information Use
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                We use collected information to: provide and maintain our services, analyze service usage to improve user experience, detect and prevent abuse or fraud, and comply with legal obligations.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                3. Information Sharing
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                We do not sell, trade, or otherwise transfer your information to third parties. We may share information in the following circumstances: with your explicit consent, to comply with legal requirements, to protect our rights and safety, or with trusted partners who help us operate our services.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                4. Data Security
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                We implement appropriate technical and organizational measures to protect your information from unauthorized access, use, modification, or disclosure. However, no internet transmission method is 100% secure, and we cannot guarantee absolute security.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                5. Data Retention
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                We retain your information to provide services and comply with legal obligations. When information is no longer needed, we securely delete or anonymize it. You can request deletion of your links and related data at any time.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                6. Cookies and Tracking Technologies
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                We use cookies and similar technologies to improve your experience, analyze usage patterns, and manage website functionality. You can control cookie usage through your browser settings.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                7. Third-party Services
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Our service may contain links to third-party websites or services. We are not responsible for third-party privacy practices. We recommend reviewing the privacy policies of any third-party websites you visit.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                8. Children's Privacy
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If we discover that we have collected such information, we will delete it immediately.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                9. Privacy Policy Updates
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                We may update this privacy policy from time to time. Any changes will be posted on this page, and we will update the "Last updated" date. We recommend reviewing this policy regularly to stay informed of any changes.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>
                                10. Contact Us
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                If you have any questions or concerns about this privacy policy, please contact us through our contact information. We will respond to your inquiry as soon as possible.
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
    const locale = getLocaleFromHeaders(acceptLanguage);

    return {
        props: {
            locale
        }
    };
}