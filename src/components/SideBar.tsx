"use client"
import React from 'react'
import Link from 'next/link';
import {
  LayoutDashboard,
  ClipboardCheck,
  Newspaper,
  User,
  LogOut,
  FileType 
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';


const SideBar = () => {

  const menus = [
    {
      name: "Dasboard",
      path: "/",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      name: "Todo List",
      path: "/todolist",
      icon: <ClipboardCheck className="mr-2 h-4 w-4" />,
    },
    {
      name: "Posts",
      path: "/posts",
      icon: <Newspaper className="mr-2 h-4 w-4" />,
    },
    {
      name: "Blogs",
      path: "/blogs",
      icon: <FileType className="mr-2 h-4 w-4" />,
    },
  ];

  const currentPath = usePathname()

  return (
    <Command className=" border-0 rounded-none ">
      <CommandInput placeholder=" Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Suggestions">
          {menus.map((menu, index) => (
            <Link key={index} href={menu.path}>
              <CommandItem
                className={`${
                  currentPath === menu.path
                    ? "active"
                    : "mb-2 duration-150  hover:translate-y-1 hover:bg-gray-700 hover:text-white hover:font-bold "
                }`}
              >
                {menu.icon}
                <span>{menu.name}</span>
              </CommandItem>
            </Link>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Settings">
          <Link href={"/profile"}>
            <CommandItem
              className={`${
                currentPath === "/profile"
                  ? "active"
                  : "mb-2 duration-150  hover:translate-y-1 hover:bg-gray-700 hover:text-white hover:font-bold "
              }`}
            >
              <User className="mr-2 h-4 w-4" />
              <span >Profile</span>
            </CommandItem>
          </Link>
          <CommandItem className="text-black mt-2 hover:font-bold hover:text-white hover:bg-black hover:transition hover:ease-in-out hover:delay-150 hover:duration-300">
            <LogOut className="mr-2 h-4 w-4" />
            <button onClick={() => signOut()}>Logout</button>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default SideBar