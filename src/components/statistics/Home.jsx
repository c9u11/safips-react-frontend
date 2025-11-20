import OverviewSummary from "./OverviewSummary";
import HistorySummary from "./HistorySummary";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-12">
      <OverviewSummary />
      <HistorySummary />
    </div>
  );
}
