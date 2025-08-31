import { useEffect, useState } from "react";

export default function TimeText({ time_zone }: { time_zone: string }) {
  const [textTime, setTextTime] = useState("--:--:--");
  const tz = time_zone;

  useEffect(() => {
    if (tz == "" || tz == null || tz == undefined) return;
    const interval = setInterval(() => {
      const now = new Date();
      const time = now.toLocaleTimeString("fr-FR", {
        timeZone: time_zone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTextTime(time);
    }, 1000);
    return () => clearInterval(interval);
  }, [tz]);

  return (
    <div className="text-3xl font-mono font-bold text-primary">{textTime}</div>
  );
}
