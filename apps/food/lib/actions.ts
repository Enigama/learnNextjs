'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';
import { revalidatePath } from 'next/cache';

const isInvalidText = (text: string) => !text || text.trim().length === 0;

export async function shareMeal(
    prevState: unknown,
    formData: FormData
): Promise<{
    message: string | null;
}> {
    const meal = {
        title: formData.get('title') as string,
        summary: formData.get('summary') as string,
        instructions: formData.get('instructions') as string,
        image: formData.get('image') as File,
        creator: formData.get('name') as string,
        creator_email: formData.get('email') as string,
    };

    //Add validation, simple
    if (
        isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        !meal.image ||
        meal.image.size === 0
    ) {
        return {
            message: 'Invalid input.',
        };
    }

    await saveMeal(meal);
    revalidatePath('/meals');
    redirect('/meals');
}
