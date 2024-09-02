import NextLink from "next/link";
import {
  Bell,
  Menu,
  MessageCircleMore,
  Package2,
  Radio,
  ScanSearch,
  Search,
  UsersRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { type PropsWithChildren } from "react";
import { UserButton } from "@clerk/nextjs";
import { DashboardIcon } from "@radix-ui/react-icons";
import { Link } from "@/components/ui/link";
import { TrialCard } from "./ui/trial-card";
import { ThemeToggle } from "./ui/theme-toggle";

export function Dashboard({ children }: PropsWithChildren) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <NextLink
              href="/"
              className="flex items-center gap-2 font-semibold"
            >
              <Package2 className="size-6" />
              <span className="">Leadiculous</span>
            </NextLink>
            <Button variant="outline" size="icon" className="ml-auto size-8">
              <Bell className="size-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link style="dashboard" href="/">
                <DashboardIcon className="size-4" />
                Dashboard
              </Link>
              <Link style="dashboard" href="/leads-finder/realtime">
                <Radio className="size-4" />
                Real-time leads
                <Badge className="ml-auto flex size-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              </Link>
              <Link style="dashboard" href="/leads-finder">
                <ScanSearch className="size-4" />
                Find leads
              </Link>
              <Link style="dashboard" href="/campaigns">
                <UsersRound className="size-4" />
                Campaigns
              </Link>
              <Link style="dashboard" href="/contacts">
                <MessageCircleMore className="size-4" />
                Contacts
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <TrialCard />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="size-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <NextLink
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="size-6" />
                  <span className="sr-only">Leadiculous</span>
                </NextLink>
                <Link style="dashboard" variant="mobile" href="/">
                  <DashboardIcon className="size-5" />
                  Dashboard
                </Link>
                <Link
                  style="dashboard"
                  variant="mobile"
                  href="/leads-finder/realtime"
                >
                  <Radio className="size-5" />
                  Real-time leads
                  <Badge className="ml-auto flex size-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link style="dashboard" variant="mobile" href="/leads-finder">
                  <ScanSearch className="size-5" />
                  Find leads
                </Link>
                <Link style="dashboard" variant="mobile" href="/campaigns">
                  <UsersRound className="size-5" />
                  Campaigns
                </Link>
                <Link style="dashboard" variant="mobile" href="/contacts">
                  <MessageCircleMore className="size-5" />
                  Contacts
                </Link>
              </nav>
              <div className="mt-auto">
                <TrialCard variant="mobile" />
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <UserButton />
          <ThemeToggle />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
