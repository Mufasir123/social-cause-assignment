import { Home } from "@/components/chat-template";
import {SidebarProvider} from "@/components/sidebar";


function ChatSidebar() {
  return (
    <SidebarProvider>
      <Home/>
    </SidebarProvider>
  );
}
export default ChatSidebar;
