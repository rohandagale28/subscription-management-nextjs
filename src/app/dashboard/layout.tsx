import React, { Suspense } from "react";
import SideBar from "@/components/dashboard/sidebar/sidebar/SideBar";
import Loading from "./Loading";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full">
      <div className="flex flex-col w-56 md:w-56 lg:w-56 xl:w-56">
        <SideBar />
      </div>
      <div className="w-full box-border">
        <div className="pt-4 w-full">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
