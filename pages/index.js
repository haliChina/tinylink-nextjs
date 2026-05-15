import { useState, useEffect } from 'react';
import { t, getLocaleFromHeaders } from '../lib/i18n';
import SeoHead from '../components/SeoHead';
import { absoluteUrl } from '../lib/site';

export default function Dashboard({ locale }) {
    const [links, setLinks] = useState([]);
    const [url, setUrl] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    async function fetchLinks() {
        const r = await fetch('/api/links');
        const j = await r.json();
        setLinks(j.links || []);
    }

    useEffect(() => { fetchLinks(); }, []);

    async function handleCreate(e) {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        try {
            const r = await fetch('/api/links', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, code: code || undefined })
            });
            const j = await r.json();
            if (!r.ok) throw new Error(j.error || 'Failed');
            setUrl('');
            setCode('');
            setSuccess(t('createSuccess', locale));
            fetchLinks();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message);
        } finally { setLoading(false); }
    }

    async function handleDelete(c) {
        if (!confirm(t('confirmDelete', locale))) return;
        await fetch(`/api/links/${c}`, { method: 'DELETE' });
        fetchLinks();
    }

    return (
        <>
            <SeoHead
                title={locale === 'zh' ? 'TinyLink - 安全短链接与点击统计工具' : 'TinyLink - Secure URL Shortener with Click Analytics'}
                description={locale === 'zh' ? 'TinyLink 是一款可自定义短链、查看点击统计并提供跳转安全提醒的短链接工具，适合运营、营销与内容团队。' : 'TinyLink is a URL shortener for creating custom short links, tracking clicks, and adding safe redirect notices for marketing and content teams.'}
                path="/"
                jsonLd={[
                    { '@context': 'https://schema.org', '@type': 'Organization', name: 'TinyLink', url: absoluteUrl('/'), contactPoint: [{ '@type': 'ContactPoint', email: 'admin@userhali.com', contactType: 'customer support' }] },
                    { '@context': 'https://schema.org', '@type': 'WebSite', name: 'TinyLink', url: absoluteUrl('/'), potentialAction: { '@type': 'SearchAction', target: `${absoluteUrl('/')}{search_term_string}`, 'query-input': 'required name=search_term_string' } },
                    { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'TinyLink', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }
                ]}
            />
        <div className="min-h-screen p-4 md:p-8 animate-fade-in">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                        TinyLink
                    </h1>
                    <p className="text-slate-600 text-lg">{t('heroSubtitle', locale)}</p>
                </div>

                {/* Create Form Card */}
                <div className="card p-6 md:p-8 mb-8 animate-slide-up">
                    <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        {t('createLink', locale)}
                    </h2>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    {t('destinationUrl', locale)}
                                </label>
                                <input
                                    type="url"
                                    className="input-field"
                                    placeholder="https://example.com/very-long-url..."
                                    value={url}
                                    onChange={e => setUrl(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="md:w-48">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    {t('customCode', locale)}
                                </label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="my-link"
                                    value={code}
                                    onChange={e => setCode(e.target.value)}
                                />
                            </div>
                            <div className="md:self-end">
                                <button
                                    type="submit"
                                    className="btn-primary w-full md:w-auto"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            {t('creating', locale)}
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            {t('createButton', locale)}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                        {error && (
                            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg animate-fade-in">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg animate-fade-in">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {success}
                            </div>
                        )}
                    </form>
                </div>

                {/* Links Table Card */}
                <div className="card overflow-hidden animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <div className="p-6 border-b border-slate-100">
                        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                            {t('yourLinks', locale)}
                            <span className="ml-2 px-2.5 py-0.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                                {links.length}
                            </span>
                        </h2>
                    </div>

                    {links.length === 0 ? (
                        <div className="p-12 text-center">
                            <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            <p className="text-slate-500 text-lg">{t('noLinks', locale)}</p>
                            <p className="text-slate-400 mt-1">{t('createFirst', locale)}</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="table-header">
                                    <tr>
                                        <th className="text-left p-4 font-semibold text-slate-700">{t('shortCode', locale)}</th>
                                        <th className="text-left p-4 font-semibold text-slate-700">{t('destinationUrl', locale)}</th>
                                        <th className="text-center p-4 font-semibold text-slate-700">{t('clicks', locale)}</th>
                                        <th className="text-left p-4 font-semibold text-slate-700">{t('lastClicked', locale)}</th>
                                        <th className="text-center p-4 font-semibold text-slate-700">{t('actions', locale)}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {links.map((link, index) => (
                                        <tr
                                            key={link.code}
                                            className="table-row border-b border-slate-100 last:border-b-0"
                                            style={{ animationDelay: `${0.05 * index}s` }}
                                        >
                                            <td className="p-4">
                                                <a
                                                    className="link-code flex items-center gap-2"
                                                    href={`/${link.code}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <span className="text-lg">/{link.code}</span>
                                                    <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            </td>
                                            <td className="p-4">
                                                <div className="max-w-md">
                                                    <p className="text-slate-700 truncate" title={link.url}>
                                                        {link.url}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="inline-flex items-center justify-center w-12 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg text-sm">
                                                    {link.clicks}
                                                </span>
                                            </td>
                                            <td className="p-4 text-slate-600 text-sm">
                                                {link.last_clicked
                                                    ? new Date(link.last_clicked).toLocaleString(locale === 'zh' ? 'zh-CN' : 'en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })
                                                    : (
                                                        <span className="text-slate-400 italic">{t('never', locale)}</span>
                                                    )}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <a
                                                        href={`/code/${link.code}`}
                                                        className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-150"
                                                    >
                                                        <span className="flex items-center gap-1">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                            </svg>
                                                            {t('stats', locale)}
                                                        </span>
                                                    </a>
                                                    <button
                                                        className="btn-danger text-sm py-1.5 px-3"
                                                        onClick={() => handleDelete(link.code)}
                                                    >
                                                        <span className="flex items-center gap-1">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                            {t('delete', locale)}
                                                        </span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-slate-500 text-sm">
                    <div className="flex justify-center gap-6 mb-4">
                        <a href="/about" className="hover:text-blue-600 transition-colors">About</a>
                        <a href="/services" className="hover:text-blue-600 transition-colors">Services</a>
                        <a href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
                        <a href="/help" className="hover:text-blue-600 transition-colors">Help</a>
                        <a href="/faq" className="hover:text-blue-600 transition-colors">FAQ</a>
                        <a href="/disclaimer" className="hover:text-blue-600 transition-colors">
                            {t('disclaimer', locale)}
                        </a>
                        <a href="/terms" className="hover:text-blue-600 transition-colors">
                            {t('terms', locale)}
                        </a>
                        <a href="/privacy" className="hover:text-blue-600 transition-colors">
                            {t('privacy', locale)}
                        </a>
                    </div>
                    <div className="mb-4">
                        <p className="mb-2">{t('contactDescription', locale)}</p>
                        <a href="mailto:admin@userhali.com" className="text-blue-600 hover:text-blue-800 transition-colors font-medium">
                            admin@userhali.com
                        </a>
                    </div>
                    <p>{t('footerText', locale)}</p>
                </div>
            </div>
        </div>
        </>
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