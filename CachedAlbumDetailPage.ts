import { AlbumDetailPage } from "./AlbumDetailPage.ts";
import type { HistoryEntry } from "./HistoryEntry.ts";


export class CachedAlbumDetailPage implements AlbumDetailPage {
    constructor(private historyEntry: HistoryEntry) {}
    async getHistoryEntry(): Promise<HistoryEntry | null> {
        return this.historyEntry;
    }
}