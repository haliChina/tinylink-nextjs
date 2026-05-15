import SeoHead from '../components/SeoHead';

export default function NotFound() {
  return <main className="min-h-screen p-8 text-center"><SeoHead title="404 Not Found | TinyLink" description="The page you requested does not exist on TinyLink." path="/404" noindex /><h1 className="text-4xl font-bold mb-4">404</h1><p>Page not found.</p><a href="/" className="text-blue-600 underline">Back to home</a></main>;
}
