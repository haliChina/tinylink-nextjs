import pool from "../../lib/db";
import { t, getLocaleFromHeaders } from "../../lib/i18n";
import SeoHead from '../../components/SeoHead';

export async function getServerSideProps({ params, req }) {
    const code = params.code;
    const acceptLanguage = req.headers['accept-language'] || '';
    const locale = getLocaleFromHeaders(acceptLanguage);

    try {
        const { rows } = await pool.query(
            "SELECT * FROM links WHERE code = $1",
            [code]
        );

        if (rows.length === 0) {
            return { notFound: true };
        }

        const link = rows[0];

        return {
            props: {
                link: {
                    code: link.code,
                    url: link.url,
                    clicks: link.clicks,
                    created_at: link.created_at ? link.created_at.toISOString() : null,
                    last_clicked: link.last_clicked ? link.last_clicked.toISOString() : null,
                },
                locale,
            },
        };
    } catch (error) {
        console.error(error);
        return { notFound: true };
    }
}

export default function StatsPage({ link, locale }) {
    const formatDate = (dateString) => {
        if (!dateString) return t('never', locale);
        return new Date(dateString).toLocaleString(locale === 'zh' ? 'zh-CN' : 'en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <SeoHead title="Link Analytics | TinyLink" description="Private analytics page for a specific TinyLink short URL." path="/code" noindex />
        <div className="min-h-screen p-4 md:p-8 animate-fade-in">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                        {t('statsTitle', locale)}
                    </h1>
                    <p className="text-slate-600 text-lg">{t('statsSubtitle', locale)}</p>
                </div>

                {/* Main Stats Card */}
                <div className="card p-8 mb-8 animate-slide-up">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">/{link.code}</h2>
                            <p className="text-slate-500">{t('shortCode', locale)}</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4 mb-6">
                        <label className="block text-sm font-medium text-slate-600 mb-2">
                            {t('destinationUrl', locale)}
                        </label>
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 break-all hover:underline transition-colors duration-150"
                        >
                            {link.url}
                        </a>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="stat-card">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-slate-600">{t('totalClicks', locale)}</span>
                            </div>
                            <p className="text-4xl font-bold text-slate-800">{link.clicks}</p>
                        </div>

                        <div className="stat-card">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-slate-600">{t('created', locale)}</span>
                            </div>
                            <p className="text-lg font-semibold text-slate-800">
                                {formatDate(link.created_at)}
                            </p>
                        </div>

                        <div className="stat-card">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-slate-600">{t('lastClicked', locale)}</span>
                            </div>
                            <p className="text-lg font-semibold text-slate-800">
                                {formatDate(link.last_clicked)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="card p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {t('quickActions', locale)}
                    </h3>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href={`/${link.code}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            {t('testLink', locale)}
                        </a>
                        <button
                            onClick={async () => {
                                try {
                                    await navigator.clipboard.writeText(`${window.location.origin}/${link.code}`);
                                    alert(t('linkCopied', locale));
                                } catch (err) {
                                    alert(t('copyFailed', locale));
                                }
                            }}
                            className="px-6 py-2.5 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            {t('copyLink', locale)}
                        </button>
                    </div>
                </div>

                {/* Back Link */}
                <div className="text-center mt-8">
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors duration-150"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {t('backToDashboard', locale)}
                    </a>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-slate-500 text-sm">
                    <p>{t('footerText', locale)}</p>
                </div>
            </div>
        </div>
        </>
    );
}