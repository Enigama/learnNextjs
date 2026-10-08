import { NewsType } from "@/dummy-news";
import Link from "next/link";

export default function NewsList({ news }: { news: NewsType[] }) {
    return (
        <ul
            className="news-list"
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
            {news.map(({ slug, id, title, image }) => (
                <li key={id}>
                    <Link href={`/news/${slug}`}>
                        <img src={`/images/news/${image}`} alt={title} width={200} />
                        <span>{title}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
