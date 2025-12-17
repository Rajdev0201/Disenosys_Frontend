import UserHeader from "@/components/layout/UserHeader";
import UserSideBar from "@/components/layout/UserSideBar";

export default function RootLayout({ children }) {
  return (
    <main className="min-h-screen">
      <div className="grid grid-cols-12 h-screen">
        {/* Sidebar - full height */}
        <div className="col-span-2 shadow-md h-full">
          <UserSideBar />
        </div>

        {/* Main content */}

        <div className="col-span-10 flex flex-col h-full overflow-y-auto relative">
          <UserHeader />
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </main>
  );
}
