import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export interface Meal {
    id: number;
    title: string;
    slug: string;
    image: string;
    summary: string;
    creator: string;
    creator_email: string;
    instructions: string;
}
export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
    // throw new Error('Loading meals failed'); // Shows an aerror page is exists one.
    return db.prepare<[], Meal>(`SELECT * FROM meals`).all();
}

export function getMeal(slug: string) {
    return db.prepare<[string], Meal>(`SELECT * FROM meals WHERE slug = ?`).get(slug);
}

export async function saveMeal(meal: Omit<Meal, 'id' | 'slug' | 'image'> & { image: File }) {
    const slug = slugify(meal.title, { lower: true });
    const instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${slug}.${extension}`;

    const newMeal: Omit<Meal, 'id'> = {
        ...meal,
        slug,
        instructions,
        image: `/images/${fileName}`,
    };

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('savimn image failed!');
        }
    });

    db.prepare(
        `
        INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `
    ).run(newMeal);
}
