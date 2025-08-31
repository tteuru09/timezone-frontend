"use client";

import { useAddPopup } from "@/app/store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

interface AddTimezoneDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const COMMON_TIMEZONES = [
  { value: "Europe/Paris", label: "Paris (CET/CEST)" },
  { value: "Europe/London", label: "Londres (GMT/BST)" },
  { value: "America/New_York", label: "New York (EST/EDT)" },
  { value: "America/Los_Angeles", label: "Los Angeles (PST/PDT)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "Asia/Shanghai", label: "Shanghai (CST)" },
  { value: "Australia/Sydney", label: "Sydney (AEST/AEDT)" },
  { value: "America/Sao_Paulo", label: "São Paulo (BRT)" },
  { value: "Asia/Dubai", label: "Dubai (GST)" },
  { value: "Europe/Berlin", label: "Berlin (CET/CEST)" },
];

export function AddTimezoneDialog() {
  const { isAddOpen, onAddOpenChange } = useAddPopup();

  const handleSave = (e: any) => {
    e.preventDefault();

    const elements = e.target.elements;
    const label = elements.label.value;
    const timezone = elements.timezone.value;

    console.log(elements.label.value, elements.timezone.value);

    /* if (!label || !timezone) {
      onOpenChange(false);
      return console.log("oneIsNull");
    } */

    axios
      .post("/api/timezone", {
        label: label,
        zone_code: timezone,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    /* const existingTimezones = JSON.parse(
      localStorage.getItem("timezones") || "[]"
    );
    const newTimezone: Timezone = {
      id: Date.now().toString(),
      label,
      timezone: selectedTimezone,
    };

    const updatedTimezones = [...existingTimezones, newTimezone];
    localStorage.setItem("timezones", JSON.stringify(updatedTimezones));  */

    // Reset form
    onAddOpenChange();

    // Trigger page refresh to update the list
    window.location.reload();
  };

  return (
    <Dialog open={isAddOpen} onOpenChange={onAddOpenChange}>
      <DialogContent
        aria-describedby="Ajout fuseau horaire"
        className="sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle>Ajouter un fuseau horaire</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="label">Libellé</Label>
            <Input
              name="label"
              id="label"
              required
              placeholder="Ex: Bureau Tokyo"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Fuseau horaire</Label>
            <Select name="timezone" required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un fuseau horaire" />
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
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => onAddOpenChange()}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button type="submit" className="flex-1">
              Ajouter
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
