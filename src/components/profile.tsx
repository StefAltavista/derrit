"use client";
import { useSession } from "next-auth/react";

export default function Profile() {
    const session = useSession();

    return session.data?.user ? (
        <div>Client: Signe in</div>
    ) : (
        <div>Client: Signe out</div>
    );
}
