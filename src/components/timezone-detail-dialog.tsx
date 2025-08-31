"use client";

import { useDetailPopup } from "@/app/store";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { Globe, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import TimeText from "./time-text";
import { Timezone } from "./timezone-list";

interface TimezoneDetailDialogProps {
  idTz: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TimezoneDetailDialog() {
  const isOpen = useDetailPopup((state) => state.isDetailOpen);
  const idTz = useDetailPopup((state) => state.idDetailTz);
  const { onDetailOpenChange, idDetailTz } = useDetailPopup();
  const [error, setError] = useState("");
  const [infoTz, setInfoTz] = useState({
    label: "",
    zone_code: "",
    currentDate: "",
    utcOffset: "",
    isDaytime: true,
  });

  console.log("ImInDetailDialog");

  const updateTimeInfo = (timezone: Timezone) => {
    const now = new Date();

    // Current date in timezone
    const dateString = now.toLocaleDateString("fr-FR", {
      timeZone: timezone?.zone_code,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // UTC offset
    const formatter = new Intl.DateTimeFormat("en", {
      timeZone: timezone?.zone_code,
      timeZoneName: "longOffset",
    });
    const parts = formatter.formatToParts(now);
    const offsetPart = parts.find((part) => part.type === "timeZoneName");

    // Determine if it's daytime (rough estimate: 6 AM to 6 PM)
    const hour = Number.parseInt(
      now.toLocaleTimeString("en-US", {
        timeZone: timezone?.zone_code,
        hour: "2-digit",
        hour12: false,
      })
    );

    console.log("zone_code", timezone.zone_code);

    setInfoTz({
      label: timezone.label,
      zone_code: timezone.zone_code,
      currentDate: dateString,
      utcOffset: offsetPart?.value || "",
      isDaytime: hour >= 6 && hour < 18,
    });
  };

  useEffect(() => {
    console.log("ImInUseEffect");
    if (!idDetailTz || !isOpen) {
      console.log("No idDetailTz or isOpen");
      return;
    }
    console.log("After idDetailTz");
    axios
      .get(`/api/timezone/${idDetailTz}`)
      .then((response) => {
        console.log("After axios");
        updateTimeInfo(response.data);
      })
      .catch((e) => setError(e));
  }, [idDetailTz]);

  /* useEffect(() => {
    if (!idTz) return;

    const updateTimeInfo = () => {
      const now = new Date();

      // Current time in timezone
      const timeString = now.toLocaleTimeString("fr-FR", {
        timeZone: timezone?.zone_code,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(timeString);

      // Current date in timezone
      const dateString = now.toLocaleDateString("fr-FR", {
        timeZone: timezone?.zone_code,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setCurrentDate(dateString);

      // UTC offset
      const formatter = new Intl.DateTimeFormat("en", {
        timeZone: timezone?.zone_code,
        timeZoneName: "longOffset",
      });
      const parts = formatter.formatToParts(now);
      const offsetPart = parts.find((part) => part.type === "timeZoneName");
      setUtcOffset(offsetPart?.value || "");

      // Determine if it's daytime (rough estimate: 6 AM to 6 PM)
      const hour = Number.parseInt(
        now.toLocaleTimeString("en-US", {
          timeZone: timezone?.zone_code,
          hour: "2-digit",
          hour12: false,
        })
      );
      setIsDaytime(hour >= 6 && hour < 18);
    };

    updateTimeInfo();
    const interval = setInterval(updateTimeInfo, 1000);
    return () => clearInterval(interval);
  }, [timezone]); */

  /* if (!infoTz) return <div>No timezone</div>;

  if (error) return <div>Erreur : {error}</div>; */

  return (
    <Dialog open={isOpen} onOpenChange={onDetailOpenChange}>
      <DialogContent className="sm:max-w-md max-h-9/12 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {infoTz.label}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Main Time Display */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-md capitalize font-bold text-center">
                  {infoTz.currentDate}
                </p>
                <TimeText time_zone={infoTz.zone_code} />
                <div className="flex items-center justify-center gap-2">
                  {infoTz.isDaytime ? (
                    <Sun className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <Moon className="h-4 w-4 text-blue-400" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {infoTz.isDaytime ? "Jour" : "Nuit"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timezone Information */}
          {/* <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Informations du fuseau
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Fuseau horaire
                </span>
                <span className="text-sm font-mono">{timezone.zone_code}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Décalage UTC
                </span>
                <span className="text-sm font-mono">{utcOffset}</span>
              </div>
            </CardContent>
          </Card> */}

          {/* Time Comparison */}
          {/* <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">
                Comparaison avec l'heure locale
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Heure locale
                  </span>
                  <span className="text-sm font-mono">
                    {new Date().toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-primary">
                    {new Date().toLocaleTimeString("fr-FR", {
                      timeZone: timezone.zone_code,
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-md font-semibold text-center ">
                    {(() => {
                      const localTime = new Date();
                      const timezoneTime = new Date(
                        localTime.toLocaleString("en-US", {
                          timeZone: timezone.zone_code,
                        })
                      );
                      const diffHours = Math.round(
                        (timezoneTime.getTime() - localTime.getTime()) /
                          (1000 * 60 * 60)
                      );

                      if (diffHours === 0) return "Même heure";
                      if (diffHours > 0) return `${diffHours}h en avance`;
                      return `${Math.abs(diffHours)}h en retard`;
                    })()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
