import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { IconHoverEffects } from "./IconHoverEffects";
import { VscAccount, VscHome, VscSignIn, VscSignOut } from "react-icons/vsc";

export function SideNav() {
  const session = useSession();
  const user = session.data?.user;
  return (
    <nav className="sticky top-0 px-2 py-4">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <Link href="/">
            <IconHoverEffects>
              <span className="flex items-center gap-4">
                <VscHome className="h-8 w-8" />
                <span className="hidden text-lg md:inline">Home</span>
              </span>
            </IconHoverEffects>
          </Link>
        </li>
        {user != null && (
          <li>
            <Link href={`/profiles/${user.id}`}>
              <IconHoverEffects>
                <span className="flex items-center gap-4">
                  <VscAccount className="h-8 w-8" />
                  <span className="hidden text-lg md:inline">Profile</span>
                </span>
              </IconHoverEffects>
              
            </Link>
          </li>
        )}
        {user == null ? (
          <li>
            <button onClick={() => void signIn()}>
            <IconHoverEffects>
                <span className="flex items-center gap-4">
                  <VscSignIn className="h-8 w-8 fill-green-700" />
                  <span className="hidden text-lg text-green-700 md:inline">Log In</span>
                </span>
              </IconHoverEffects>
            </button>
          </li>
        ) : (
          <li>
            <button onClick={() => void signOut()}>
            <IconHoverEffects>
                <span className="flex items-center gap-4">
                  <VscSignOut className="h-8 w-8 fill-red-700" />
                  <span className="hidden text-lg text-red-700 md:inline">Log In</span>
                </span>
              </IconHoverEffects>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
