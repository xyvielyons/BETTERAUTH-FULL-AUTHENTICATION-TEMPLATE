"use client";

import { authClient } from "@/auth-client";
import Link from "next/link";
import SignoutButton from "./signout-button";
import { Button } from "@/components/ui/button";

export default function AuthButtons() {
	const { data: session } = authClient.useSession();
	console.log(session)
	return !session ? (
		<div className="flex gap-2 justify-center">
			<Link href="/sign-in">
				<Button>Sign In</Button>
			</Link>
			<Link href="/sign-up">
				<Button>Sign Up</Button>
			</Link>
		</div>
	) : (
		<div className="flex items-center gap-2">
			<SignoutButton />
		</div>
	);
}