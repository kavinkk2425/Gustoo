import { GustoEvent } from "./types";
import { GUSTO_EVENTS as BACKUP_EVENTS } from "@/src/data_backup/events";

/**
 * GUSTO '26 (2.0) — Central Event Database
 * Single Source of Truth for all 9 Technical and Non-Technical events.
 */
export const GUSTO_EVENTS: GustoEvent[] = BACKUP_EVENTS;
