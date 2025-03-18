import { AlbumDetailPage } from "./AlbumDetailPage.ts";
import { CachedAlbumDetailPage } from "./CachedAlbumDetailPage.ts";
import { DomClient } from "./domclient.ts";
import { HistoryEntry } from "./HistoryEntry.ts";
import { ProxyAlbumDetailPage } from "./ProxyAlbumDetailPage.ts";
import { SETTINGS } from "./settings.ts";

export class AlbumPage {
  client: DomClient;

  constructor(url: string) {
    this.client = new DomClient(url);
  }

  

  async getAlbumPages(cachedCDs: Array<HistoryEntry>): Promise<Array<AlbumDetailPage>> {
    const page = await this.client.fetchDOM();
    const anchorTags = page.getElementsByTagName("a");
    const albumUrls = anchorTags.map(anchorTag => `${SETTINGS.BASE_URL}${anchorTag.getAttribute("href")}`);
    return albumUrls.map(url => {
      const [cachedCD] = [...cachedCDs].filter(cd => cd.origin === url);
      if (cachedCD) {
        return new CachedAlbumDetailPage(cachedCD);
      }
      return new ProxyAlbumDetailPage(url);
    });
  }
}
