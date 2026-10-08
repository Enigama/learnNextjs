import NewsList from "@/components/newsList";
import { getAllNews } from "@/lib/news";

export default async function NewsPage() {
    const newsData = await getAllNews();
    //INFO: Example of fetching data from an API endpoint instead of using the local database
    // const response = await fetch("http://localhost:8080/news");
    // if (!response.ok) {
    //     throw new Error("Failed to fetch news");
    // }
    // const newsData = await response.json();
    return (
        <main>
            <ul style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <NewsList news={newsData} />
            </ul>
        </main>
    );
}
