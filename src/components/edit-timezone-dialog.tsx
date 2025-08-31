"use client";

import { useEditPopup } from "@/app/store";
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
import { useEffect, useState } from "react";
import type { Timezone } from "./timezone-list";

interface EditTimezoneDialogProps {
  timezone: Timezone | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (timezone: Timezone) => void;
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

export function EditTimezoneDialog() {
  const isOpen = useEditPopup((state) => state.isEditOpen);
  const { changeIdEditTz, idEditTz, onEditOpenChange } = useEditPopup();
  const [timezone, setTimezone] = useState<Timezone | null>(null);

  console.log("imInEditTimezoneDialog");
  useEffect(() => {
    console.log("imInEditTimezoneDialogUseEffect");
    if (!idEditTz || !isOpen) {
      console.log("No idEditTz or isOpen");
      return;
    }
    axios.get(`/api/timezone/${idEditTz}`).then((response) => {
      console.log("EditTimezoneDialogUseEffectResponse");
      setTimezone(response.data);
    });
    return;
  }, [isOpen]);

  const handleSave = (e: any) => {
    console.log("handleSave");
    e.preventDefault();
    const elements = e.target.elements;
    const label = elements.label.value;
    const timezone = elements.timezone.value;
    console.log("label", label);
    console.log("timezone", timezone);
    axios
      .put(`/api/timezone/${idEditTz}`, {
        label,
        zone_code: timezone,
      })
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log("error", error);
      });
    onEditOpenChange();
    window.location.reload();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onEditOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Modifier le fuseau horaire</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-label">Libellé</Label>
            <Input
              name="label"
              id="edit-label"
              placeholder="Ex: Bureau Tokyo"
              defaultValue={timezone?.label}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-timezone">Fuseau horaire</Label>
            <Select name="timezone" defaultValue={timezone?.zone_code}>
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
              onClick={() => onEditOpenChange()}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button type="submit" className="flex-1">
              Sauvegarder
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
