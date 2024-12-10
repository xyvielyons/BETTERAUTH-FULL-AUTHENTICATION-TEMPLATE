import Link from "next/link";
import AuthButtons from "./auth-buttons";
export default function Navbar() {
	return (
		<nav className="flex justify-between items-center py-3 px-4 fixed top-0 left-0 right-0 z-50 bg-slate-100">
			<Link href="/" className="text-xl font-bold">
				better-auth
			</Link>
			<AuthButtons />
		</nav>
	);
}