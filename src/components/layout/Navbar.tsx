"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { FiBookOpen, FiUser, FiLogOut } from "react-icons/fi";

interface NavbarProps {
  userEmail: string | null;
  onSignOut: () => void;
}

export function Navbar({ userEmail, onSignOut }: NavbarProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 border-b border-divider bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="bg-primary/10 p-1.5 rounded-lg">
            <FiBookOpen className="text-primary w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold tracking-tight">BooksLog</h1>
        </div>

        <div className="flex items-center gap-3">
          {userEmail && (
            <Button
              variant="primary"
              onPress={() => router.push("/profile")}
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-foreground bg-default-100 hover:bg-default-200 px-3 py-1.5 rounded-lg border border-divider transition-all h-auto"
            >
              <FiUser className="w-3.5 h-3.5 text-default-500" />
              <span className="max-w-[180px] truncate">{userEmail}</span>
            </Button>
          )}
          <Button
            isIconOnly
            size="sm"
            variant="danger"
            onPress={onSignOut}
            className="rounded-full"
            aria-label="Cerrar sesión"
          >
            <FiLogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
