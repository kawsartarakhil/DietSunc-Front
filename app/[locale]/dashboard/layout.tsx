import DashboardSidebar from '@/components/DashboardSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#f7fcf9] dark:bg-gray-950 min-h-screen">

      <DashboardSidebar />
      <div className="md:ml-64 p-8">
        {children}
      </div>
    </div>
  );
}
