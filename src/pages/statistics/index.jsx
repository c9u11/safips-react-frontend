import Topbar from "@/components/statistics/TopBar";
import GlobalNavigationBar from "@/components/layout/GlobalNavigationBar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/components/statistics/Home";
import Overview from "@/components/statistics/Overview";
import History from "@/components/statistics/History";
import HistoryDetail from "@/components/statistics/HistoryDetail";
import { ROUTES_PATH_ROOT } from "@/constants/routes";

export default function Statistics() {
  return (
    <div className="w-full h-full flex flex-col">
      <Routes>
        <Route path={ROUTES_PATH_ROOT} element={<Home />} />
        <Route path={"/overview"} element={<Overview />} />
        <Route path={"/history"} element={<History />} />
        <Route path={"/history/:id"} element={<HistoryDetail />} />
        <Route path="*" element={<Navigate to={ROUTES_PATH_ROOT} />} />
      </Routes>
      <GlobalNavigationBar />
    </div>
  );
}
