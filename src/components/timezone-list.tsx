import axios from "axios";
import { useEffect, useState } from "react";
import TimezoneCard from "./timezone-card";

export interface Timezone {
  id: string;
  label: string;
  zone_code: string;
}

export function TimezoneList() {
  const [timezones, setTimezones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("ImInTimezoneList");
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/timezone`, {
        headers: {},
      })
      .then((response) => {
        console.log("IminResponse");
        console.log(response);
        setTimezones(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("IminError");
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (timezones.length == 0) return <div>Vide</div>;

  return (
    <div className="space-y-4">
      {timezones.map((timezone: Timezone) => (
        <TimezoneCard key={timezone.id} timezone={timezone} />
      ))}

      {/* <EditTimezoneDialog
        timezone={editingTimezone}
        open={!!editingTimezone}
        onOpenChange={(open) => !open && setEditingTimezone(null)}
        onSave={updateTimezone}
      /> */}
    </div>
  );
}
