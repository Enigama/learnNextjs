import sql from "better-sqlite3";

const db = sql("data.db");

interface NewsItem {
    id: string;
    slug: string;
    title: string;
    image: string;
    date: string;
    content: string;
}

export async function getAllNews() {
    const news = db.prepare<[], NewsItem>("SELECT * FROM news").all();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return news;
}

export async function getNewsItem(slug: string) {
    const newsItem = db
        .prepare<[string], NewsItem>("SELECT * FROM news WHERE slug = ?")
        .get(slug);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return newsItem;
}

export async function getLatestNews() {
    const latestNews = db
        .prepare("SELECT * FROM news ORDER BY date DESC LIMIT 3")
        .all();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return latestNews;
}

export async function getAvailableNewsYears() {
    const years = db
        .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
        .all()
        .map((year) => year.year);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return years;
}

export function getAvailableNewsMonths(year: string) {
    return db
        .prepare(
            "SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?",
        )
        .all(year)
        .map((month) => month.month);
}

export async function getNewsForYear(year: string) {
    const news = db
        .prepare<[string], NewsItem>(
            "SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC",
        )
        .all(year);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return news;
}

export async function getNewsForYearAndMonth(year: string, month: string) {
    const news = db
        .prepare<[string, string], NewsItem>(
            "SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC",
        )
        .all(year, month);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return news;
}
