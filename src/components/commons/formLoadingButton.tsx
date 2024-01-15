import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

interface FormLoadingButtonProps {
    children: React.ReactNode;
}

export default function FormLoadingButton({
    children,
}: FormLoadingButtonProps) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" isLoading={pending}>
            {children}
        </Button>
    );
}
