import { useState, useEffect } from 'react';

export default function Dashboard() {
    const [links, setLinks] = useState([]);
    const [url, setUrl] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function fetchLinks() {
        const r = await fetch('/api/links');
        const j = await r.json();
        setLinks(j.links || []);
    }

    useEffect(() => { fetchLinks(); }, []);

    async function handleCreate(e) {
        e.preventDefault();
        setError('');
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
            fetchLinks();
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
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">TinyLink</h1>

            <form onSubmit={handleCreate} className="mb-6">
                <div className="flex gap-2">
                    <input
                        className="flex-1 p-2 border rounded"
                        placeholder="https://example.com/..."
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                    />
                    <input
                        className="w-44 p-2 border rounded"
                        placeholder="custom code (optional)"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                    />
                    <button
                        className="px-4 py-2 bg-slate-800 text-white rounded"
                        disabled={loading}
                    >
                        Create
                    </button>
                </div>
                {error && <p className="text-red-600 mt-2">{error}</p>}
            </form>

            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="text-left border-b">
                        <th className="p-2">Code</th>
                        <th className="p-2">URL</th>
                        <th className="p-2">Clicks</th>
                        <th className="p-2">Last Clicked</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {links.map(l => (
                        <tr key={l.code} className="border-b">
                            <td className="p-2">
                                <a
                                    className="text-blue-600"
                                    href={`/${l.code}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {l.code}
                                </a>
                            </td>
                            <td className="p-2 truncate max-w-sm">{l.url}</td>
                            <td className="p-2">{l.clicks}</td>
                            <td className="p-2">
                                {l.last_clicked
                                    ? new Date(l.last_clicked).toLocaleString()
                                    : '-'}
                            </td>
                            <td className="p-2">
                                <button
                                    className="px-2 py-1 bg-red-600 text-white rounded"
                                    onClick={() => handleDelete(l.code)}
                                >
                                    Delete
                                </button>
                                <a className="ml-3 text-slate-700" href={`/code/${l.code}`}>
                                    Stats
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
