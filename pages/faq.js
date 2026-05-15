import SeoHead from '../components/SeoHead';

const faqs=[
['TinyLink 是什么？','TinyLink 是一个短链接工具，可将长网址转换为简短可分享的链接，并提供点击统计。'],
['适合谁使用？','适合运营、内容团队、市场人员和需要管理链接投放效果的个人用户。'],
['是否支持自定义短码？','支持。你可以在创建短链时填写自定义 code，若已被占用需更换。'],
];
export default function FAQ(){return <main className="min-h-screen p-6 max-w-4xl mx-auto"><SeoHead title="FAQ | TinyLink" description="Common questions about TinyLink short links, analytics, and redirect safety." path="/faq" jsonLd={{'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))}}/><h1 className="text-3xl font-bold mb-4">常见问题 FAQ</h1>{faqs.map(([q,a])=><section key={q} className="mb-4"><h2 className="font-semibold">{q}</h2><p>{a}</p></section>)}</main>}
