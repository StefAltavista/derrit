"use client";

import { useFormState } from "react-dom";
import {
    Input,
    Button,
    Textarea,
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@nextui-org/react";
import * as actions from "@/actions";
import FormLoadingButton from "../commons/formLoadingButton";

interface PostCreateFormPorps {
    slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormPorps) {
    const [formState, action] = useFormState(
        actions.createPost.bind(null, slug),
        {
            errors: {},
        }
    );

    return (
        <Popover>
            <PopoverTrigger>
                <Button color="primary">Create Post</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg">Create Post</h3>
                        <Input
                            isInvalid={!!formState.errors.title}
                            errorMessage={formState.errors.title?.join(", ")}
                            name="title"
                            label="title"
                            labelPlacement="outside"
                            placeholder="Title"
                        ></Input>
                        <Textarea
                            isInvalid={!!formState.errors.content}
                            errorMessage={formState.errors.content?.join(", ")}
                            name="content"
                            label="Content"
                            labelPlacement="outside"
                            placeholder="Content"
                        ></Textarea>
                        {formState.errors._form ? (
                            <div className="border border-red-400 rounded p-2 bg-red-200">
                                {formState.errors._form.join(", ")}
                            </div>
                        ) : null}
                        <FormLoadingButton>Post</FormLoadingButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}
