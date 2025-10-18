import { useState } from "react";
import { requestSensorPermissions } from "@/utils/sensor";
import { useDriveStore } from "@/stores/useDriveStore";

export default function Home() {
  const {
    driveHistory,
    accelerationX,
    accelerationY,
    accelerationZ,
    gyroscopeX,
    gyroscopeY,
    gyroscopeZ,
    startDrive,
    stopDrive
  } = useDriveStore();
  const [permissionStatus, setPermissionStatus] = useState("pending");

  const requestPermissions = async () => {
    let allGranted = false;
    try {
      setPermissionStatus("requesting");

      const permissions = await requestSensorPermissions();

      allGranted = Object.values(permissions).every(
        (permission) =>
          permission === "granted" || permission === "not-supported"
      );
    } finally {
      if (allGranted) setPermissionStatus("granted");
      else setPermissionStatus("denied");
    }
  };

  const startHandler = async () => {
    await startDrive();
  };
  const endHandler = async () => {
    await stopDrive();
  };

  return (
    <div className="py-3 px-10 gap-2 flex flex-col">
      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={requestPermissions}
        >
          Request Permissions
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={startHandler}
        >
          Start
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={endHandler}
        >
          Stop
        </button>
      </div>
      <table className="w-full border-collapse border">
        <tbody>
          <tr>
            <th>권한 상태</th>
            <td>{permissionStatus}</td>
          </tr>
          <tr>
            <th>가속도 X</th>
            <td>{accelerationX || "N/A"}</td>
          </tr>
          <tr>
            <th>가속도 Y</th>
            <td>{accelerationY || "N/A"}</td>
          </tr>
          <tr>
            <th>가속도 Z</th>
            <td>{accelerationZ || "N/A"}</td>
          </tr>
          <tr>
            <th>자이로스코프 X</th>
            <td>{gyroscopeX || "N/A"}</td>
          </tr>
          <tr>
            <th>자이로스코프 Y</th>
            <td>{gyroscopeY || "N/A"}</td>
          </tr>
          <tr>
            <th>자이로스코프 Z</th>
            <td>{gyroscopeZ || "N/A"}</td>
          </tr>
        </tbody>
      </table>
      {/* driveHistory */}
      <div className="w-full overflow-x-auto overflow-y-auto h-130 bg-gray-100 rounded-md">
        <table className="w-full whitespace-nowrap text-center border-separate border-spacing-3">
          <thead className="sticky top-0 bg-gray-100 h-10">
            <tr>
              <th>time</th>
              <th>accX</th>
              <th>accY</th>
              <th>accZ</th>
              <th>gyroX</th>
              <th>gyroY</th>
              <th>gyroZ</th>
              <th>lat</th>
              <th>lng</th>
            </tr>
          </thead>
          <tbody>
            {driveHistory.reverse().map((item) => (
              <tr key={item.timestamp}>
                <td>
                  {new Date(item.timestamp).toLocaleTimeString([], {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    fractionalSecondDigits: 3
                  })}
                </td>
                <td>{item.accelerationX}</td>
                <td>{item.accelerationY}</td>
                <td>{item.accelerationZ}</td>
                <td>{item.gyroscopeX}</td>
                <td>{item.gyroscopeY}</td>
                <td>{item.gyroscopeZ}</td>
                <td>{item.latitude}</td>
                <td>{item.longitude}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
