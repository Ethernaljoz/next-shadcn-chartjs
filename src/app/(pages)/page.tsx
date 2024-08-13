/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kfKxYkVsKHI
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import DashboardCard from "@/components/DashboardCard";
import ChartBar from "@/components/Chart";




export default function Home() {
  return (
    <div className="flex h-screen">
      
      <main className="flex-1 p-6 bg-white">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-4xl font-bold">Dashboard</h2>
        </header>
        <DashboardCard />
        <section>
          <ChartBar />
        </section>
        
      </main>
    </div>
  );
}
