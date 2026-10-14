"use server";

import { uploadImage } from "@/lib/cloudinery";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(_: unknown, data: FormData) {
    const title = data.get("title") as string;
    const image = data.get("image") as File;
    const content = data.get("content") as string;

    const errors = [];

    if (!title || !title.trim().length) {
        errors.push("Title is required");
    }

    if (!image || !image.size) {
        errors.push("Image is required");
    }

    if (!content || !content.trim().length) {
        errors.push("Content is required");
    }

    if (errors.length) {
        return { errors };
    }

    let imageUrl: string;
    try {
        imageUrl = await uploadImage(image);
    } catch (error) { }

    await storePost({
        title,
        // @ts-ignore
        imageUrl,
        content,
        userId: 1,
    });
    revalidatePath("/feed");
    redirect("/feed");
}

export async function togglePostLikeStatus(postId: number) {
    await updatePostLikeStatus(postId, 2);
    revalidatePath("/feed");
}
