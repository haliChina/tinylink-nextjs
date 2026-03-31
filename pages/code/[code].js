import pool from "../../lib/db";

export async function getServerSideProps({ params }) {
    const code = params.code;

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
            },
        };
    } catch (error) {
        console.error(error);
        return { notFound: true };
    }
}

export default function StatsPage({ link }) {
    return (
        <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
            <h1>Stats for: {link.code}</h1>

            <p><strong>Original URL:</strong> {link.url}</p>
            <p><strong>Clicks:</strong> {link.clicks}</p>
            <p><strong>Created:</strong> {link.created_at}</p>
            <p><strong>Last Clicked:</strong> {link.last_clicked || "-"}</p>

            <br />
            <a href="/">Back to Dashboard</a>
        </div>
    );
}
