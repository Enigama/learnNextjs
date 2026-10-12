import NewsList from "@/components/newsList";
import { getLatestNews } from "@/lib/news";

export default async function DefaultPage() {
    const latestNews = await getLatestNews();
    return (
        <>
            <h2>Latest news</h2>
            <NewsList news={latestNews} />
        </>
    );
}
