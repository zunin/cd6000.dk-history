import type { HistoryEntry } from "./HistoryEntry.ts";


export interface AlbumDetailPage {
  getHistoryEntry(): Promise<HistoryEntry | null>;
}
