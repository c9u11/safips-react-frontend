import Topbar from "./TopBar";
import OverviewSummary from "./OverviewSummary";
import HistorySummary from "./HistorySummary";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="w-full flex-1 flex flex-col justify-evenly overflow-y-auto pb-16 gap-12">
        <OverviewSummary />
        <HistorySummary />
      </div>
    </>
  );
}
