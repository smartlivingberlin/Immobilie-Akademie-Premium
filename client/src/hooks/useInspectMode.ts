import { useEffect, useState } from "react";
import { activateInspectModeFromServer, isInspectModeSync } from "@/lib/inspectMode";

export function useInspectMode() {
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(isInspectModeSync());

  useEffect(() => {
    void activateInspectModeFromServer().then((inspect) => {
      setActive(inspect || isInspectModeSync());
      setReady(true);
    });
  }, []);

  return { ready, active };
}
