"use server";
import { z } from "zod";
import { auth } from "@/auth";
import type { Topic } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";
import paths from "@/paths";
import { revalidatePath } from "next/cache";

//validation with zod
const createTopicSchema = z.object({
    name: z
        .string()
        .min(3)
        .regex(/^[a-z-]+$/, {
            message: "Must be letters or dashes without spaces",
        }),
    description: z.string().min(10),
});

interface CreateTopicFormState {
    errors: {
        name?: string[];
        description?: string[];
        _form?: string[];
    };
}

export async function createTopic(
    formState: CreateTopicFormState,
    formData: FormData
): Promise<CreateTopicFormState> {
    await new Promise((fn) => {
        setTimeout(fn, 2500);
    });
    const validation = createTopicSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
    });

    const session = await auth();

    if (!session || !session.user) {
        return { errors: { _form: ["You must be sign in to create a topic"] } };
    } else if (!validation.success) {
        return { errors: validation.error.flatten().fieldErrors };
    }

    let topic: Topic;
    try {
        topic = await db.topic.create({
            data: {
                slug: validation.data.name,
                description: validation.data.description,
            },
        });
    } catch (e: unknown) {
        return {
            errors: {
                _form:
                    e instanceof Error ? [e.message] : ["something went wrong"],
            },
        };
    }

    revalidatePath("/");
    redirect(paths.topicShowPath(topic.slug));
}
