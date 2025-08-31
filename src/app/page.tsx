"use client";

import { AddTimezoneDialog } from "@/components/add-timezone-dialog";
import { EditTimezoneDialog } from "@/components/edit-timezone-dialog";
import { TimeConverter } from "@/components/time-converter";
import { TimezoneDetailDialog } from "@/components/timezone-detail-dialog";
import { TimezoneList } from "@/components/timezone-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHighlightRerender } from "@/lib/utils";
import { Clock, Globe, Plus, Settings } from "lucide-react";
import { useState } from "react";
import { useAddPopup } from "./store";

type View = "home" | "converter" | "settings";

export default function HomePage() {
  const { onAddOpenChange } = useAddPopup();
  const [currentView, setCurrentView] = useState<View>("home");
  const highlightRef = useHighlightRerender("bg-green-400");
  console.log("ImInHomePage");

  const renderView = () => {
    switch (currentView) {
      case "home":
        return (
          <div className="space-y-6 min-h-screen">
            <div className="flex items-start justify-between flex-col gap-2">
              <div className="flex items-center flex-col w-full">
                <h1 className="text-2xl font-bold text-foreground">
                  Mes Fuseaux Horaires
                </h1>
                <p className="text-muted-foreground">
                  Gérez vos horaires mondiaux
                </p>
              </div>
              <Button
                onClick={() => {
                  onAddOpenChange();
                }}
                size="sm"
              >
                <Plus className="h-4 w-4" />
                Ajouter
              </Button>
            </div>
            <TimezoneList />
            <EditTimezoneDialog />
            <TimezoneDetailDialog />
          </div>
        );
      case "converter":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Convertisseur
              </h1>
              <p className="text-muted-foreground">
                Convertissez les heures entre fuseaux
              </p>
            </div>
            <TimeConverter />
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6 min-h-screen">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Paramètres</h1>
              <p className="text-muted-foreground">
                Configuration de l'application
              </p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Préférences</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Fonctionnalités à venir...
                </p>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={highlightRef}
      className="min-h-screen bg-background relative w-full"
    >
      {/* Main Content */}
      <main className="p-4">{renderView()}</main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 inset-x-0 bg-card border-t border-border">
        <div className="flex items-center justify-around py-2">
          <Button
            variant={currentView === "home" ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrentView("home")}
            className="flex flex-col items-center gap-1 h-auto py-2"
          >
            <Globe className="h-5 w-5" />
            <span className="text-xs">Accueil</span>
          </Button>
          <Button
            variant={currentView === "converter" ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrentView("converter")}
            className="flex flex-col items-center gap-1 h-auto py-2"
          >
            <Clock className="h-5 w-5" />
            <span className="text-xs">Convertir</span>
          </Button>
          <Button
            variant={currentView === "settings" ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrentView("settings")}
            className="flex flex-col items-center gap-1 h-auto py-2"
          >
            <Settings className="h-5 w-5" />
            <span className="text-xs">Paramètres</span>
          </Button>
        </div>
      </nav>

      {/* Add Timezone Dialog */}
      <AddTimezoneDialog />
    </div>
  );
}
