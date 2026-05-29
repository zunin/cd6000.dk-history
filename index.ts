import type { HistoryEntry } from "./HistoryEntry.ts";
import { Website } from "./website.ts";
import { MusicBrainzClient } from "./musicbrainzclient.ts";
import { AlbumDetailPage } from "./AlbumDetailPage.ts";
import { CachedAlbumDetailPage } from "./CachedAlbumDetailPage.ts";
import { ProxyAlbumDetailPage } from "./ProxyAlbumDetailPage.ts";
import { SETTINGS } from "./settings.ts";
import { DomClient } from "./domclient.ts";

let cachedCDs: Array<HistoryEntry> = [];
try {
    const cachedCDText = await Deno.readTextFile("./cds.json");
    cachedCDs = JSON.parse(cachedCDText);
} catch (_) {
}

const cachedCDMap = new Map<string, HistoryEntry>();
for (const cd of cachedCDs) {
    cachedCDMap.set(`${cd.artist}||${cd.albumTitle}`, cd);
}

const cachedCDUrlMap = new Map<string, HistoryEntry>();
for (const cd of cachedCDs) {
    cachedCDUrlMap.set(cd.origin, cd);
}

const lookupList: Array<HistoryEntry> = [];
const mbClient = new MusicBrainzClient();

const website = new Website();
const pages = await website.getPages();
for (const page of pages) {
    const pageDOM = await page.client.fetchDOM();
    const anchorTags = pageDOM.getElementsByTagName("a");
    const albumUrls = anchorTags.map(anchorTag => `${SETTINGS.BASE_URL}${anchorTag.getAttribute("href")}`);
    
    for (const url of albumUrls) {
        const cachedByUri = cachedCDUrlMap.get(url);
        if (cachedByUri?.musicbrainz !== undefined) {
            lookupList.push(cachedByUri);
            continue;
        }
        
        let albumDetailPage: AlbumDetailPage;
        if (cachedByUri) {
            albumDetailPage = new CachedAlbumDetailPage(cachedByUri);
        } else {
            albumDetailPage = new ProxyAlbumDetailPage(url);
        }
        
        let entry = await albumDetailPage.getHistoryEntry();
        if (entry !== null) {
            const cachedEntry = cachedCDMap.get(
                `${entry.artist}||${entry.albumTitle}`,
            );
            if (cachedEntry?.musicbrainz !== undefined) {
                lookupList.push(cachedEntry);
            } else {
                entry = await mbClient.ensureMusicBrainzMetaData(entry);
                lookupList.push(entry);
            }
        }
    }
}

Deno.writeTextFile("./cds.json", JSON.stringify(lookupList, null, "\t"));
