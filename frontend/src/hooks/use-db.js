import { useEffect, useState } from "react";
import { db } from "../lib/store.js";

export function useDb() {
  const [snap, setSnap] = useState(() => db.all());
  useEffect(() => {
    const handler = () => setSnap(db.all());
    window.addEventListener("db-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("db-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return snap;
}