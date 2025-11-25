import { memo } from "react";
import Card from "./Card";
import HistoryData from "./HistoryData";

function HistoryDataCard({ title, distance, count, speed, time, calories }) {
  return (
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
  )
}

export default memo(HistoryDataCard);