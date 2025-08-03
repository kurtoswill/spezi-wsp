"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { AlignJustify, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  handleLinkClick?: () => void;
}

const NavbarItem = ({ href, children, handleLinkClick }: NavbarItemProps) => {
  return (
      <Button
          asChild
          className="text-base"
          variant={"link"}
          onClick={handleLinkClick}
      >
        <Link href={href}>{children}</Link>
      </Button>
  );
};

const NavbarItems = [
  { href: "/", children: "Home" },
  { href: "/#features", children: "Features" },
  { href: "/#pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
  { href: "/about", children: "About Us" },
];

export const Navbar = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, signOut, loading } = useAuth();

  const handleTriggerClick = () => {
    setIsSheetOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
    setIsSheetOpen(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
      <>
        {/* Mobile Menu Overlay */}
        <div
            className={`${
                isSheetOpen ? "flex" : "hidden"
            } flex-col fixed items-center justify-between pt-20 pb-8 px-6 w-full h-full inset-0 bg-white z-40`}
        >
          <div className="flex flex-col gap-6 items-center mt-8">
            {NavbarItems.map((item) => (
                <NavbarItem
                    key={item.href}
                    href={item.href}
                    handleLinkClick={handleLinkClick}
                >
                  {item.children}
                </NavbarItem>
            ))}
          </div>

          <div className="flex flex-col gap-4 w-full max-w-sm">
            {user ? (
                <>
                  <div className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <User size={16} />
                    <span className="text-sm text-gray-700 truncate">
                  {user.email}
                </span>
                  </div>
                  <Button
                      variant={"outline"}
                      className="w-full py-3"
                      onClick={handleSignOut}
                      disabled={loading}
                  >
                    <LogOut size={16} className="mr-2" />
                    {loading ? "Signing out..." : "Sign Out"}
                  </Button>
                </>
            ) : (
                <Button variant={"outline"} className="w-full py-3" asChild>
                  <Link href="/waitlist" onClick={handleLinkClick}>
                    Join the Waitlist
                  </Link>
                </Button>
            )}
            <Link href="/login">
              <Button variant="default" className="w-full py-6">
                Sign in
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
          <div className="flex justify-between items-center px-6 md:px-8 lg:px-32 xl:px-[200px] py-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                  src="/logos/spezi-logo-2.png"
                  alt="Spezi logo"
                  width={100}
                  height={100}
                  priority
              />
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex lg:items-center lg:justify-center flex-1 mx-8">
              <nav
                  role="navigation"
                  aria-label="Main navigation"
                  className="flex items-center"
              >
                {NavbarItems.map((item) => (
                    <NavbarItem key={item.href} href={item.href}>
                      {item.children}
                    </NavbarItem>
                ))}
              </nav>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex gap-4 flex-shrink-0 items-center">
              {user ? (
                  <div className="relative">
                    <Button
                        variant={"outline"}
                        className="px-6 py-5.5 flex items-center gap-2"
                        onClick={toggleUserMenu}
                    >
                      <User size={16} />
                      <span className="max-w-32 truncate">{user.email}</span>
                    </Button>

                    {/* User Dropdown Menu */}
                    {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                          <div className="py-1">
                            <div className="px-4 py-2 text-sm text-gray-500 border-b">
                              Signed in as
                            </div>
                            <div className="px-4 py-2 text-sm font-medium text-gray-900 border-b truncate">
                              {user.email}
                            </div>
                            <Button
                                variant={"ghost"}
                                className="w-full justify-start px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50"
                                onClick={handleSignOut}
                                disabled={loading}
                            >
                              <LogOut size={16} className="mr-2" />
                              {loading ? "Signing out..." : "Sign Out"}
                            </Button>
                          </div>
                        </div>
                    )}
                  </div>
              ) : (
                  <Button variant={"outline"} className="px-6 py-5.5" asChild>
                    <Link href="/waitlist">Join the Waitlist</Link>
                  </Button>
              )}
              <Link href="/login">
                <Button variant="default" className="w-full py-6">
                  Sign in
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={handleTriggerClick}
                aria-label={isSheetOpen ? "Close menu" : "Open menu"}
            >
              {isSheetOpen ? <X size={24} /> : <AlignJustify size={24} />}
            </button>
          </div>
        </div>

        {/* Click outside to close user menu */}
        {showUserMenu && (
            <div
                className="fixed inset-0 z-40"
                onClick={() => setShowUserMenu(false)}
            />
        )}
      </>
  );
};