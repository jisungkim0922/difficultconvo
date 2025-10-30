"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from "@/components/ui/command";
import { Search, Home, FileText, User, Settings, SquareArrowOutUpRight } from "lucide-react";

export default function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const mod = isMac ? e.metaKey : e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (!mod && e.key === "/") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <>
      {/* tiny hint in the corner */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-sm text-zinc-700 shadow-sm backdrop-blur-md transition hover:bg-white/90 dark:border-white/10 dark:bg-black/40 dark:text-zinc-200"
      >
        <Search className="h-4 w-4" />
        Search <span className="ml-1 rounded border border-black/15 px-1.5 py-0.5 text-xs dark:border-white/20">⌘K</span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigate">
            <CommandItem onSelect={() => go("/")}>
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
              <CommandShortcut>G H</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => go("/peb")}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Perspective Exchange Blog</span>
            </CommandItem>
            <CommandItem onSelect={() => go("/profiles")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profiles</span>
            </CommandItem>
            <CommandItem onSelect={() => go("/admin")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Admin Dashboard</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="External">
            <CommandItem
              onSelect={() => {
                setOpen(false);
                window.open("https://difficultconvo.org", "_blank");
              }}
            >
              <SquareArrowOutUpRight className="mr-2 h-4 w-4" />
              <span>Open Site (new tab)</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
