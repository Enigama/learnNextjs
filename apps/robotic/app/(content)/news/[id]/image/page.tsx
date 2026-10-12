import { getNewsItem } from "@/lib/news";

export default async function ImagePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const newsItem = await getNewsItem(id);

    return (
        <div>
            <img src={`/images/news/${newsItem?.image}`} alt={newsItem?.title} />
        </div>
    );
}
