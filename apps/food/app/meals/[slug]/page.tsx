import Image from 'next/image';
import classes from './page.module.css';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const meal = getMeal((await params).slug);

    if (!meal) {
        notFound();
    }

    return {
        title: meal ? meal.title : 'Meal not found',
        description: meal ? meal.summary : 'No meal found with the provided slug.',
    };
}

export default async function MealPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const meal = getMeal(slug);

    if (!meal) {
        notFound();
    }

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} fill alt={meal.title} />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto: ${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p
                    className={classes.instructions}
                    dangerouslySetInnerHTML={{
                        __html: meal.instructions,
                    }}
                ></p>
            </main>
        </>
    );
}
