import { Sidebar } from '@/components/layout/Sidebar';
import { ChatInterface } from '@/components/chat/ChatInterface';

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-[#111521]">
      <Sidebar />
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <ChatInterface />
      </main>
    </div>
  );
}
