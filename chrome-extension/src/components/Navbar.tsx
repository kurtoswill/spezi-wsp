"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { AlignJustify, X, User, LogOut } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  return (
    <>
      <div className="flex-col fixed items-center justify-between pt-20 pb-8 px-6 w-full h-full inset-0 bg-white z-40">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="spezi-logo-2.png"
            alt="Spezi logo"
            width={50}
            height={50}
            priority
          />
        </Link>
      </div>
    </>
  );
};
