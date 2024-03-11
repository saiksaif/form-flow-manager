"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    console.log('called')
    await signOut();
    localStorage.setItem('isLoggedIn',false)

    router.push("/"); // Redirect to the login page after signing out
  };

  return (
    <button
      className="px-2 mx-2 flex items-center border rounded-md p-2 "
      onClick={handleSignOut}
    >
      Signout <LogOut className="ml-3" fontSize={14}/>
    </button>
  );
}
