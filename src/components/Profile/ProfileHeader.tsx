"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { FiArrowLeft, FiBookOpen } from "react-icons/fi";

export function ProfileHeader({ userEmail }: { userEmail: string | null }) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 border-b border-divider bg-background/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3">
        <Button
          variant="primary"
          onPress={() => router.push("/")}
          className="gap-1.5 text-sm font-medium text-foreground bg-default-100 hover:bg-default-200 px-3 py-1.5 rounded-lg border border-divider transition-all h-auto"
        >
          <FiArrowLeft className="w-4 h-4" /> <span>Inicio</span>
        </Button>

        <div className="flex items-center gap-2 flex-1">
          <FiBookOpen className="text-primary w-4 h-4" />
          <h1 className="text-base font-bold tracking-tight">Mi Perfil</h1>
        </div>

        {userEmail && (
          <p className="text-xs text-default-400 hidden sm:block truncate max-w-[200px]">
            {userEmail}
          </p>
        )}
      </div>
    </header>
  );
}
