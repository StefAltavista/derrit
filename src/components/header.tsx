import Link from "next/link";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Input,
} from "@nextui-org/react";
import HeaderAuth from "./headerAuth";

export default function Header() {
    return (
        <Navbar className="shadow mb-6">
            <NavbarBrand>
                <Link href="/" className="font-bold">
                    Derrit
                </Link>
            </NavbarBrand>

            <NavbarContent className="justify-center">
                <NavbarItem>
                    <Input></Input>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="justify-end">
                <HeaderAuth></HeaderAuth>
            </NavbarContent>
        </Navbar>
    );
}
