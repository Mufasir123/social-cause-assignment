"use client";

// ** Imports: React & Hooks **
import React, { useEffect, useState } from "react";

// ** UI Components **
import {
  SidebarInset,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

// ** Dropdown Menu Components **
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ** Icons **
import {
  Brush,
  Camera,
  ChartBarIncreasing,
  ChevronUp,
  CircleFadingPlus,
  CircleOff,
  CircleUserRound,
  File,
  Image,
  ListFilter,
  Menu,
  MessageCircle,
  MessageSquareDashed,
  MessageSquareDot,
  Mic,
  Paperclip,
  Phone,
  Search,
  Send,
  Settings,
  Smile,
  SquarePen,
  Star,
  User,
  User2,
  UserRound,
  Users,
  Video,
} from "lucide-react";
import { useSelector } from "react-redux";
import ChatProfile from "@/components/ChatProfile";
import axios from "axios";

// // ** Contact List **
// const contactList = [
//   {
//     name: "Sandeep Kumar",
//     message: "Just checking in.",
//     image: "https://randomuser.me/api/portraits/men/19.jpg",
//   },
//   {
//     name: "Lavanya Patel",
//     message: "Don't forget the meeting.",
//     image: "https://randomuser.me/api/portraits/women/20.jpg",
//   },
// ];

// ** Sidebar Menu Items **
const menuItems = [
  { title: "Messages", url: "#", icon: MessageCircle },
  { title: "Phone", url: "#", icon: Phone },
  { title: "Status", url: "#", icon: CircleFadingPlus },
];

// ** Home Component **
export const Home = () => {
  const { toggleSidebar } = useSidebar();
  const [currentChat, setCurrentChat] = useState();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const user = useSelector((state) => state.user?.user);
  // console.log("users", user);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (debouncedQuery) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-users?search=${debouncedQuery}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("Results:", res.data);
          setResults(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [debouncedQuery]);

  return (
    <>
      {/* Sidebar */}
      {/* Main Content */}
      {/* <div className=""> */}
      <SidebarInset>
        <ResizablePanelGroup direction="horizontal" className="h-screen">
          {/* Left Panel - Chat List */}
          <ResizablePanel
            defaultSize={25}
            minSize={20}
            className="flex-grow overflow-hidden"
          >
            <div className="flex flex-col h-screen border ml-1">
              <div className="h-10 px-2 py-4 flex items-center">
                <p className="ml-1">Chats</p>
                <div className="flex justify-end w-full">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" size="icon">
                        <SquarePen />
                      </Button>
                    </DropdownMenuTrigger>


                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <User /> New Contact
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users /> New Group
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <ListFilter />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Filter Chats By</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <MessageSquareDot /> Unread
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star /> Favorites
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CircleUserRound /> Contacts
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CircleOff /> Non Contacts
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Users /> Groups
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquareDashed /> Drafts
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative px-2 py-4">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" />
                <Input
                  placeholder="Search or start new chat"
                  className="pl-10"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              {/* Contact List */}
              <ScrollArea className="flex-grow">
                {results.map((contact, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentChat(contact)}
                    className="px-4 w-full py-2 hover:bg-secondary cursor-pointer text-left"
                  >
                    <div className="flex flex-row gap-2">
                      <Avatar className="size-12">
                        <AvatarImage src={contact.image} />
                        <AvatarFallback>{contact.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <CardTitle>{contact.name}</CardTitle>
                        <CardDescription>{contact.message}</CardDescription>
                      </div>
                    </div>
                  </button>
                ))}
              </ScrollArea>
            </div>
          </ResizablePanel>
          {/* <ResizableHandle /> */}
          {/* Right Panel - Chat Window */}
          {/* <div className=""> */}

          <ResizableHandle className="w-1 bg-gray-200" />
          <ResizablePanel className="-mr-15 lg:mr-0 flex-grow">
            <div className="flex flex-col justify-between h-screen pb-5 pr-3">
              {/* Chat Header */}
              <div className="h-16 border-b flex items-center">
                <ChatProfile currentChat={currentChat} />
                {/* <Avatar className="size-12 ml-2">
                <AvatarImage src={currentChat?.image} />
                <AvatarFallback>PR</AvatarFallback>
              </Avatar> */}
                <div className="space-y-1 ml-2">
                  <CardTitle>{currentChat?.name}</CardTitle>
                  <CardDescription>{'contact' && currentChat?.email}</CardDescription>
                </div>
                <div className="flex-grow flex justify-end gap-5">
                <Button variant="ghost" size="icon" className="mr-20">
                  {/* <Video /> */}
                  Passion: {currentChat?.yourPassion.toUpperCase()
                  }
                </Button>
              </div>
              </div>

              {/* Chat Input */}
              <div className="flex h-10 pt-2 border-t w-80 lg:w-[100%] ml-3 mr-3">
                <Button variant="ghost" size="icon">
                  <Smile />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon">
                      <Paperclip />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Image /> Photos & Videos
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Camera /> Camera
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <File /> Document
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UserRound /> Contact
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ChartBarIncreasing /> Poll
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Brush /> Drawing
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Input
                  className="flex-grow border-0"
                  placeholder="Type a message"
                />

                <Button variant="ghost" size="icon">
                  <Send />
                </Button>
                {/* <Button variant="ghost" size="icon">
                <Mic />
              </Button> */}
              </div>
            </div>
          </ResizablePanel>
          {/* </div> */}
        </ResizablePanelGroup>
      </SidebarInset>
      {/* </div> */}
    </>
  );
};
