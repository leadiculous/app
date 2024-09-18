"use client";

import { signOutAction } from "./actions";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { useMustAuth } from "./auth-provider";
import { useRouter } from "next/navigation";
import { sha256 } from "js-sha256";

export function UserButton() {
  const user = useMustAuth();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={
              user.email
                ? `https://www.gravatar.com/avatar/${sha256(user.email)}`
                : undefined
            }
          />
          <AvatarFallback>
            {user.email?.slice(0, 1)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => router.push("/account/reset-password")}
        >
          Reset password
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOutAction()}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
