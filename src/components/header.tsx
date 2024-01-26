import Link from "next/link";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@nextui-org/react";
import HeaderAuth from "./headerAuth";
import SearchInput from "./search-input";
import { Suspense } from "react";

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
                    <Suspense>
                        <SearchInput />
                    </Suspense>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="justify-end">
                <HeaderAuth></HeaderAuth>
            </NavbarContent>
        </Navbar>
    );
}
