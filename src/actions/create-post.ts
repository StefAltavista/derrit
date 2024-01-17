"use server";
import type { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";

const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
});

interface CreatePostFromState {
    errors: {
        title?: string[];
        content?: string[];
        _form?: string[];
    };
}

export async function createPost(
    slug: string,
    formState: CreatePostFromState,
    formData: FormData
): Promise<CreatePostFromState> {
    const validation = createPostSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content"),
    });

    if (!validation.success) {
        return { errors: validation.error.flatten().fieldErrors };
    }

    const session = await auth();
    if (!session || !session.user) {
        return { errors: { _form: ["You must be signed in to post"] } };
    }

    const topic = await db.topic.findFirst({ where: { slug } });
    if (!topic) {
        return { errors: { _form: ["Cannot find the topic"] } };
    }

    let post: Post;
    try {
        post = db.post.create({
            data: {
                title: validation.data.title,
                content: validation.data.content,
                userId: session.user.id,
                topicId: topic.id,
            },
        });
    } catch (e: unknown) {
        if (e instanceof Error) {
            return { errors: { _form: [e.message] } };
        } else {
            return { errors: { _form: ["something went wrong"] } };
        }
    }

    revalidatePath(paths.topicShowPath(slug));
    redirect(paths.postShowPath(slug, post.id));

    // revalidate post page
}
