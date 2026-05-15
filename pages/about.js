import SeoHead from '../components/SeoHead';
import { absoluteUrl } from '../lib/site';

export default function AboutPage() {
  return <main className="min-h-screen p-6 max-w-4xl mx-auto">
    <SeoHead title="About TinyLink | URL Shortener Platform" description="Learn what TinyLink is, who it is for, and how teams use it to create safer short links with basic analytics." path="/about" jsonLd={{'@context':'https://schema.org','@type':'Service',name:'TinyLink URL Shortening Service',provider:{'@type':'Organization',name:'TinyLink'},serviceType:'URL shortening and link tracking',areaServed:'Global',url:absoluteUrl('/about')}} />
    <h1 className="text-3xl font-bold mb-4">About TinyLink</h1><p className="text-slate-700 mb-4">TinyLink is a web-based URL shortener designed for creators, operations teams, and marketers who need clean links and quick click analytics.</p>
    <h2 className="text-xl font-semibold mb-2">What it does</h2><p>It lets you create custom short codes, redirect users through a safety notice, and review click activity for each short link.</p>
  </main>;
}
