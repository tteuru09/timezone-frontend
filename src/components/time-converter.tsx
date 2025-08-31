"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Clock } from "lucide-react";
import { useState } from "react";
import type { Timezone } from "./timezone-list";
import { Button } from "./ui/button";

const COMMON_TIMEZONES = [
  { value: "Europe/Paris", label: "Paris", city: "Paris" },
  { value: "Europe/London", label: "Londres", city: "Londres" },
  { value: "America/New_York", label: "New York", city: "New York" },
  { value: "America/Los_Angeles", label: "Los Angeles", city: "Los Angeles" },
  { value: "Asia/Tokyo", label: "Tokyo", city: "Tokyo" },
  { value: "Asia/Shanghai", label: "Shanghai", city: "Shanghai" },
  { value: "Australia/Sydney", label: "Sydney", city: "Sydney" },
  { value: "America/Sao_Paulo", label: "São Paulo", city: "São Paulo" },
  { value: "Asia/Dubai", label: "Dubai", city: "Dubai" },
  { value: "Europe/Berlin", label: "Berlin", city: "Berlin" },
];

export function TimeConverter() {
  const [sourceTimezone, setSourceTimezone] = useState("Europe/Paris");
  const [timezones, setTimezones] = useState<Timezone[]>([]);
  const [convertedTimes, setConvertedTimes] = useState<any[]>([]);

  // Load user timezones
  /* useEffect(() => {
    const saved = localStorage.getItem("timezones");
    if (saved) {
      setTimezones(JSON.parse(saved));
    }
  }, []); */

  // Convert times when inputs change
  /* useEffect(() => {
    const inputDate = new Date().toISOString().split("T")[0];
    const inputTime = new Date().toTimeString().slice(0, 5);

    const sourceDateTime = new Date(`${inputDate}T${inputTime}:00`);

    // Check if the date is valid
    if (isNaN(sourceDateTime.getTime())) return;

    const times: Record<string, string> = {};

    // Convert to all common timezones
    COMMON_TIMEZONES.forEach((tz) => {
      try {
        const converted = new Date(
          sourceDateTime.toLocaleString("en-US", { timeZone: sourceTimezone })
        );
        const offset = sourceDateTime.getTime() - converted.getTime();
        const targetTime = new Date(sourceDateTime.getTime() + offset);

        times[tz.value] = targetTime.toLocaleString("fr-FR", {
          timeZone: tz.value,
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      } catch (error) {
        times[tz.value] = "Erreur";
      }
    });

    // Convert to user's custom timezones
    timezones.forEach((tz) => {
      try {
        const converted = new Date(
          sourceDateTime.toLocaleString("en-US", { timeZone: sourceTimezone })
        );
        const offset = sourceDateTime.getTime() - converted.getTime();
        const targetTime = new Date(sourceDateTime.getTime() + offset);

        times[tz.zone_code] = targetTime.toLocaleString("fr-FR", {
          timeZone: tz.zone_code,
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      } catch (error) {
        times[tz.zone_code] = "Erreur";
      }
    });

    setConvertedTimes(times);
  }, [sourceTimezone, timezones]); */

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const elements = e.target.elements;
    const date = elements.date.value;
    const time = elements.time.value;
    const sourceTimezone = elements.source_timezone.value;
    const sourceDateTime = `${date}T${time}`;
    axios
      .get(
        `/api/timezone/convert?date_time=${sourceDateTime}&zone_code=${sourceTimezone}`
      )
      .then((response) => {
        console.log("responseConvert", response.data);
        setConvertedTimes(response.data);
      })
      .catch((error) => {
        throw new Error(error);
      });

    console.log("inputDate", date);
    console.log("inputTime", time);
    console.log("sourceTimezone", sourceTimezone);
  };

  return (
    <div className="space-y-6 min-h-screen">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Heure source
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  name="date"
                  id="date"
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Heure</Label>
                <Input
                  name="time"
                  id="time"
                  type="time"
                  defaultValue={new Date().toTimeString().slice(0, 5)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="source_timezone">Fuseau horaire source</Label>
              <Select name="source_timezone" defaultValue={sourceTimezone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COMMON_TIMEZONES.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit">Convertir</Button>
          </form>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Conversions</h3>

        {/* User's Custom Timezones */}
        {convertedTimes.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">
              Mes fuseaux horaires
            </h4>
            {convertedTimes.map((tz, key) => (
              <Card key={key}>
                <CardContent className="pt-4">
                  <div className="flex items-start flex-col gap-2">
                    <div className="flex items-start gap-2 flex-col">
                      <span className="font-medium">{tz.label}</span>
                      <Badge variant="secondary" className="text-xs">
                        {tz.zone_code}
                      </Badge>
                    </div>
                    <div className="text-md text-muted-foreground">
                      {tz.date}
                    </div>
                    <div className="text-lg font-mono font-semibold text-primary">
                      {tz.time}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
