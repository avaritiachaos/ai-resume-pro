"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogIn, LogOut, User } from "lucide-react";
import { useStore } from "@/lib/store";

export function AuthButton() {
  const { isAuthenticated, setAuthenticated, setCredits } = useStore();

  const handleLogin = () => {
    // In production, use: signIn('github') or signIn('google')
    setAuthenticated(true);
    setCredits(1);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <Button
        onClick={handleLogin}
        variant="outline"
        className="border-white/20 text-white hover:bg-white/10"
      >
        <LogIn className="mr-2 h-4 w-4" />
        登录
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative h-9 w-9 rounded-full bg-transparent border-0 cursor-pointer outline-none">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-blue-600 text-white text-sm">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-gray-900 border-white/10 text-white"
        align="end"
      >
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          退出登录
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
