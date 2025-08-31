import { useDetailPopup, useEditPopup } from "@/app/store";
import axios from "axios";
import { Edit, Eye, Trash2 } from "lucide-react";
import TimeText from "./time-text";
import { Timezone } from "./timezone-list";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function TimezoneCard({ timezone }: { timezone: Timezone }) {
  const { onDetailOpenChange, changeIdDetailTz } = useDetailPopup();
  const { changeIdEditTz, onEditOpenChange } = useEditPopup();

  const deleteTimezone = (id: string) => {
    axios
      .delete(`/api/timezone/${id}`)
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log("error", error);
      });
    window.location.reload();
  };
  return (
    <Card className="relative">
      <CardHeader className="relative ">
        <div className="flex flex-col items-start gap-2 max-w-[70%]">
          <CardTitle className="text-lg">{timezone.label}</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {timezone.zone_code}
          </Badge>
        </div>
        <div>
          <Button
            variant="destructive"
            size="sm"
            className="absolute right-0 top-0 mr-4"
            onClick={() => deleteTimezone(timezone.id)}
          >
            <span className="size-11 absolute top-1/2 left-1/2 -translate-1/2"></span>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-start justify-between flex-col">
          <div className="text-md text-muted-foreground">
            {new Date().toLocaleDateString("fr-FR", {
              timeZone: timezone.zone_code,
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </div>
          <TimeText time_zone={timezone.zone_code} />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-center items-center gap-5">
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              className="relative"
              onClick={() => {
                changeIdDetailTz(Number(timezone.id));
                onDetailOpenChange();
              }}
            >
              <span className="h-11 w-full absolute top-1/2 left-1/2 -translate-1/2"></span>
              <Eye className="h-4 w-4" />
              <span className="text-sm">Détails</span>
            </Button>
          </div>

          <Button
            variant="default"
            size="sm"
            className="relative"
            onClick={() => {
              changeIdEditTz(Number(timezone.id));
              onEditOpenChange();
            }}
          >
            <span className="size-11 absolute top-1/2 left-1/2 -translate-1/2"></span>
            <Edit className="h-4 w-4" />
            <span className="text-sm">Modifier</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
