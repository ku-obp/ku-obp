import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { GameSidebar } from "@/components/game-sidebar/game-sidebar";
import { MobileToggle } from "@/components/mobile-toggle";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="h-full bg-zinc-950">
      <div className="hidden lg:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <GameSidebar />
      </div>
      <main className="lg:pl-[72px] h-full">
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
