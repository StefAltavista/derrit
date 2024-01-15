"use client";
import { useFormState } from "react-dom";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    Textarea,
    Button,
    Input,
} from "@nextui-org/react";
import * as actions from "@/actions";
import FormLoadingButton from "../commons/formLoadingButton";

export default function TopicCreateForm() {
    const [formState, action] = useFormState(actions.createTopic, {
        errors: {},
    });

    return (
        <Popover placement="left">
            <PopoverTrigger>
                <Button color="primary">Create a Topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3>Create a Topic</h3>
                        <Input
                            name="name"
                            label="Name"
                            labelPlacement="outside"
                            placeholder="Topic name"
                            isInvalid={!!formState.errors.name}
                            errorMessage={formState.errors.name?.join(", ")}
                        />

                        <Textarea
                            name="description"
                            label="Description"
                            labelPlacement="outside"
                            placeholder="Describe your topic"
                            isInvalid={!!formState.errors.description}
                            errorMessage={formState.errors.description?.join(
                                ", "
                            )}
                        />
                        {formState.errors._form ? (
                            <div className="p-2 bg-red-200 border border-red-400 border-rounded">
                                {formState.errors._form?.join(", ")}
                            </div>
                        ) : null}
                        <FormLoadingButton>Submit</FormLoadingButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}
