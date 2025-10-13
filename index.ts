import type { HistoryEntry } from "./HistoryEntry.ts";
import { Website } from "./website.ts";
import { MusicBrainzClient } from "./musicbrainzclient.ts";

const cachedCDText = await Deno.readTextFile("./cds.json");
const cachedCDs: Array<HistoryEntry> = JSON.parse(cachedCDText);

const lookupList: Array<HistoryEntry> = [];
const mbClient = new MusicBrainzClient();

const website = new Website();
const pages = await website.getPages();
for (const page of pages) {
  const albums = await page.getAlbumPages(cachedCDs);
  for (const album of albums) {
    let entry = await album.getHistoryEntry();
    if (entry !== null) {
      entry = await mbClient.ensureMusicBrainzMetaData(entry);
      lookupList.push(entry);
    }
  }
}

Deno.writeTextFile("./cds.json", JSON.stringify(lookupList, null, "\t"));
