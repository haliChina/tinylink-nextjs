import { useState, useEffect } from 'react';

export default function Dashboard() {
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
            setSuccess('Link created successfully!');
            fetchLinks();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message);
        } finally { setLoading(false); }
    }

    async function handleDelete(c) {
        if (!confirm('Delete this link?')) return;
        await fetch(`/api/links/${c}`, { method: 'DELETE' });
        fetchLinks();
    }

    return (
        <div className="min-h-screen p-4 md:p-8 animate-fade-in">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                        TinyLink
                    </h1>
                    <p className="text-slate-600 text-lg">Shorten your URLs with style</p>
                </div>

                {/* Create Form Card */}
                <div className="card p-6 md:p-8 mb-8 animate-slide-up">
                    <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        Create Short Link
                    </h2>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Destination URL
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
                                    Custom Code (optional)
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
                                            Creating...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Create Link
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
                            Your Links
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
                            <p className="text-slate-500 text-lg">No links yet</p>
                            <p className="text-slate-400 mt-1">Create your first short link above</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="table-header">
                                    <tr>
                                        <th className="text-left p-4 font-semibold text-slate-700">Short Code</th>
                                        <th className="text-left p-4 font-semibold text-slate-700">Destination URL</th>
                                        <th className="text-center p-4 font-semibold text-slate-700">Clicks</th>
                                        <th className="text-left p-4 font-semibold text-slate-700">Last Clicked</th>
                                        <th className="text-center p-4 font-semibold text-slate-700">Actions</th>
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
                                                    ? new Date(link.last_clicked).toLocaleString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })
                                                    : (
                                                        <span className="text-slate-400 italic">Never</span>
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
                                                            Stats
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
                                                            Delete
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
                    <p>Built with Next.js & Tailwind CSS</p>
                </div>
            </div>
        </div>
    );
}