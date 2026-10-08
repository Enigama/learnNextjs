import NewsList from "@/components/newsList";
import {
    getAvailableNewsMonths,
    getAvailableNewsYears,
    getNewsForYear,
    getNewsForYearAndMonth,
} from "@/lib/news";
import { Suspense } from "react";

async function FilterHeader({ year, month }: { year: string; month: string }) {
    let links = await getAvailableNewsYears();

    if (year && !month) {
        links = getAvailableNewsMonths(year);
    }

    if (year && month) {
        links = [];
    }
    return (
        <header>
            <nav>
                <ul>
                    {links.map((link) => {
                        const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;
                        return (
                            <li key={link}>
                                <a href={href}>{link}</a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
}

async function FilterdNews({ year, month }: { year: string; month: string }) {
    let news;
    if (year && !month) {
        news = await getNewsForYear(year);
    } else if (year && month) {
        news = await getNewsForYearAndMonth(year, month);
    }

    let newsContent = <p>No news found for hits selected period.</p>;

    if (news && news.length > 0) {
        newsContent = <NewsList news={news} />;
    }
    return newsContent;
}

export default async function ArchiveYearPage({
    params,
}: {
    params: Promise<{ filter: string }>;
}) {
    const { filter } = await params;
    const selectedYear = filter?.[0];
    const selectedMonth = filter?.[1];

    const availableYears = await getAvailableNewsYears();

    if (
        (selectedYear && !availableYears.includes(selectedYear)) ||
        (selectedMonth &&
            !getAvailableNewsMonths(selectedYear).includes(selectedMonth))
    ) {
        throw new Error(`Invalid filter.`);
    }

    return (
        <>
            <Suspense fallback={<p>Loading filter...</p>}>
                <FilterHeader year={selectedYear} month={selectedMonth} />
            </Suspense>
            <Suspense fallback={<p>Loading news...</p>}>
                <FilterdNews year={selectedYear} month={selectedMonth} />
            </Suspense>
        </>
    );
}
