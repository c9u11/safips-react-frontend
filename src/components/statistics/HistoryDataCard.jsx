import { memo } from "react";
import Card from "./Card";
import HistoryData from "./HistoryData";
import { Link } from "react-router-dom";
import { ROUTES_PATH_STATISTICS_HISTORY } from "@/constants/routes";

function HistoryDataCard({ id, title, distance, count, speed, time, calories }) {
  return (
    <Link to={`${ROUTES_PATH_STATISTICS_HISTORY}/${id}`}>
      <Card>
        <HistoryData
          title={title}
          distance={distance}
          count={count}
          speed={speed}
          time={time}
          calories={calories}
        />
      </Card>
    </Link>
  )
}

export default memo(HistoryDataCard);