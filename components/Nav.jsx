import Link from "next/link";
import { getServerSession } from "next-auth";
import {options} from "../app/api/auth/[...nextauth]/options"

const Nav = async () => {
  const session = await getServerSession(options);
  return (
    <header className="bg-gray-600 text-gray-100">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div>White Lotus</div>
        <div className="flex gap-10">
          <Link href="/">Home</Link>
          <Link href="/ServerMember">Member Server Sde</Link>
          <Link href="/ClientMember">Member Client Sde</Link>
          <Link href="/Admin/dashboard">Admin Dashboard</Link>
          <Link href="/User/dashboard">User Dashboard</Link>
          
          <Link href="/Public">Public</Link>
          {session ? (
            <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
          ) : (
            <Link href="/api/auth/signin">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
