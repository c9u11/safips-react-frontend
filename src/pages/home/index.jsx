import Controller from "@/components/record/Controller";
import Status from "@/components/record/Status";
import Topbar from "@/components/record/TopBar";
import GlobalNavigationBar from "@/components/layout/GlobalNavigationBar";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col">
      <Topbar />
      <div className="w-full flex-1 flex flex-col justify-evenly">
        <Status />
        <Controller />
      </div>
      <GlobalNavigationBar />
    </div>
  );
}
