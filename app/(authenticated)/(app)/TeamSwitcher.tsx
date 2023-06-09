"use client";

import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loading } from "@/components/loading";

import {
  useAuth,
  useOrganization,
  useOrganizationList,
  useUser,
} from "@clerk/clerk-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

type Props = {};

export const TeamSwitcher: React.FC<Props> = (): JSX.Element => {
  const { setActive, organizationList } = useOrganizationList();
  const { organization: currentOrg } = useOrganization();

  const { signOut } = useAuth();
  const { user } = useUser();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function changeOrg(id: string | null) {
    if (!setActive) {
      return;
    }
    try {
      setLoading(true);
      await setActive({ organization: id });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <DropdownMenu>
      {loading ? (
        <Loading />
      ) : (
        <DropdownMenuTrigger className="flex items-center justify-between w-full px-2 py-1 rounded gap-4 hover:bg-zinc-100 dark:hover:bg-zinc-700">
          <div className="flex items-center justify-start w-full gap-4 ">
            <Avatar>
              {user?.profileImageUrl ? (
                <AvatarImage
                  src={user.profileImageUrl}
                  alt={user.username ?? "Profile picture"}
                />
              ) : null}
              <AvatarFallback className="flex items-center justify-center w-8 h-8 overflow-hidden border rounded-md bg-zinc-100 border-zinc-500 text-zinc-700">
                {(currentOrg?.slug ?? user?.username ?? "")
                  .slice(0, 2)
                  .toUpperCase() ?? "P"}
              </AvatarFallback>
            </Avatar>
            <span>{currentOrg?.name ?? "Personal"}</span>
          </div>
          {/* <PlanBadge plan={currentTeam?.plan ?? "DISABLED"} /> */}
          <ChevronsUpDown className="w-4 h-4" />
        </DropdownMenuTrigger>
      )}
      <DropdownMenuContent className="w-full lg:w-56" align="end" forceMount>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <button
              onClick={async () => {
                await signOut();
                router.refresh();
              }}
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span>Sign out</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
