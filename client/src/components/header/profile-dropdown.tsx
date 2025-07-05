import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { currentUserProfileQueryOptions } from "@/lib/api-options";
import { api } from "@/utils/client";
import { useQuery } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import { LogOut, Settings, User } from "lucide-react";

export default function ProfileDropdown() {
  const router = useRouter();

  const handleSignout = async () => {
    const res = await api.public.auth.signout.$post();
    if (res.ok) {
      router.navigate({
        to: "/signin",
      });
    }
  };

  const { data } = useQuery(currentUserProfileQueryOptions);
  const avatarUrl = data?.images?.[0]?.url || undefined;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full">
        <img
          src={avatarUrl}
          alt="avatar"
          className="h-9 w-9 rounded-full object-cover"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={14}
        className="bg-card w-42 rounded-xs border-none shadow-lg"
      >
        <DropdownMenuItem asChild>
          <Link to="/profile" className="">
            <User />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignout} className="text-red-500">
          <LogOut className="text-red-500" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
