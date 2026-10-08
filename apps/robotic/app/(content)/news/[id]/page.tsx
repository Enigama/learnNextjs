import { getNewsItem } from "@/lib/news";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function NewsItemPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const newsItem = await getNewsItem(id);

    if (!newsItem) {
        notFound();
    }

    return (
        <article>
            <header>
                <Link href={`/news/${newsItem?.slug}/image`}>
                    <img
                        src={`/images/news/${newsItem?.image}`}
                        alt={newsItem?.title}
                        width={200}
                    />
                </Link>
                <h1>{newsItem?.title}</h1>
                <time dateTime={newsItem?.date}>{newsItem?.date}</time>
            </header>
            <p>{newsItem?.content}</p>
        </article>
    );
}
