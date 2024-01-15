"use client";
import Link from "next/link";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Input,
    Button,
    Avatar,
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";

export default function HeaderAuth() {
    const session = useSession();

    let authContent: React.ReactNode = session.data?.user ? (
        <Popover placement="left">
            <PopoverTrigger>
                <Avatar src={session.data.user.image || ""} />
            </PopoverTrigger>
            <PopoverContent>
                <div className="p-4">
                    <form action={actions.signOut}>
                        <Button type="submit">Sign Out</Button>
                    </form>
                </div>
            </PopoverContent>
        </Popover>
    ) : (
        <>
            <form action={actions.signIn}>
                <NavbarItem>
                    <Button type="submit" color="primary" variant="bordered">
                        Sing In
                    </Button>
                </NavbarItem>
            </form>
            <form action={actions.signIn}>
                <NavbarItem>
                    <Button type="submit" color="primary" variant="flat">
                        Sing Up
                    </Button>
                </NavbarItem>{" "}
            </form>
        </>
    );

    return session.status === "loading" ? null : authContent;
}
