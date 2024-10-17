import type { AlbumDetailPage } from "./AlbumDetailPage.ts";
import { DomClient } from "./domclient.ts";
import type { HistoryEntry } from "./HistoryEntry.ts";
import { SETTINGS } from "./settings.ts";

export class ProxyAlbumDetailPage implements AlbumDetailPage {
    client: DomClient;
    formatter: Intl.NumberFormat;
    constructor(private url: string) {
        this.client = new DomClient(url);
        this.formatter = new Intl.NumberFormat('da-DK', {
            style: 'currency',
            currency: 'DKK',
        });
    }

    async getHistoryEntry(): Promise<HistoryEntry | null> {
        const details = await this.client.fetchDOM();
        const [priceParagraph] = details.getElementsByTagName("td").filter(td => cleanText(td.textContent)?.toLowerCase()?.startsWith("pris kr.") ?? false);
        let price: number = SETTINGS.DEFAULT_PRICE_IN_DKK;
        if (priceParagraph) {
            const cleanedText = cleanText(priceParagraph.textContent)
                .toLowerCase().replaceAll("pris kr. ", "")
                .replace(",-", ",00")
                .replace(",", ".");
            if (cleanedText !== "") {
                price = parseFloat(cleanedText);
            }
        }

        const [detailsTable] = details.getElementsByTagName("table").filter(table => table.hasAttribute("border") && table.getAttribute("border") == "1");
        
        if (!detailsTable) {
            return null;
        }
        
        const [artistNameRow, albumNameRow, publisherInfoRow, orderNumberRow, tracklistRow] = detailsTable.getElementsByTagName("tr");
        
        if (!artistNameRow || !albumNameRow) {
            return null;
        }

        return <HistoryEntry>{
            albumTitle: cleanText(albumNameRow?.textContent),
            artist: cleanText(artistNameRow?.textContent),
            price: this.formatter.format(price),    
            origin: this.url
        } 
    }
}

function cleanText(text?: string): string {
    return (text ?? "")
        .replaceAll("\u00a0", " ")
        .replaceAll("\n", " ")
        .replaceAll("\t", " ")
        .replaceAll(/ +(?= )/g,'')
        .trim()
 }
