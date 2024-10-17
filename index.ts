import type { HistoryEntry } from "./HistoryEntry.ts";
import { Website } from "./website.ts";

const cachedCDText = await Deno.readTextFile("./cds.json");
const cachedCDs: Array<HistoryEntry> = JSON.parse(cachedCDText);

const lookupList: Array<HistoryEntry> = []

const website = new Website();
const pages = await website.getPages();
for(const page of pages) {
    const albums = await page.getAlbumPages(cachedCDs as unknown as Array<HistoryEntry>);
    for(const album of albums) {
        const entry = await album.getHistoryEntry();
        if (entry !== null) {
            lookupList.push(entry);
        }
    }
}

Deno.writeTextFile("./cds.json", JSON.stringify(lookupList, null, '\t'));
