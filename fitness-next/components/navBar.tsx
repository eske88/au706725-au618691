"use client";
import React from "react";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <nav className="bg-genericGradient-100 p-4 flex">
      <button
        className="rounded-full bg-white p-1 w-fit  shadow-sm shadow-black"
        onClick={() => router.push("/")}
      >
        <Image src={"/home.png"} alt={"go home"} width={30} height={30} />
      </button>
      <section className="ml-auto">
        {user && <p className="text-white">{user.Name}x</p>}
        {user && <p className="text-slate-300 text-xs">{user.Role}</p>}
      </section>
    </nav>
  );
};

export default NavBar;
