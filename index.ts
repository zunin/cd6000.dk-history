import { DOMParser, HTMLDocument, Element } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';
import { sleep } from "./sleep.ts"
const settings = {
    BASE_URL: "https://cd6000.dk/"
}


const DEFAULT_PRICE_IN_DKK = 10;

async function fetchDOM(url: string): Promise<HTMLDocument> {
    const response = await fetch(url);
    await sleep(1000);
    console.log(url)
    const arrayBuffer = await response.arrayBuffer();
    const html = new TextDecoder("iso-8859-10").decode(new Uint8Array(arrayBuffer))
    return new DOMParser().parseFromString(html, 'text/html');
}

const homepageDOM = await fetchDOM(settings.BASE_URL);
const menuAnchors: Array<Element> = homepageDOM.getElementsByTagName('span').flatMap(span => span.getElementsByTagName("a")).filter(anchor => anchor.getAttribute("target") === "I1") 
const uris: Array<string> = menuAnchors.map(anchor => `${settings.BASE_URL}${anchor.getAttribute("href")}`)

function isArtistRow(element: Element): boolean {
    return element.hasAttribute("colspan")
}

function isWhiteSpace(input: string): boolean {
    return /^\s+$/.test(input)
}

function cleanText(text: string): string {
    return text
        .replaceAll("\u00a0", " ")
        .replaceAll("\n", " ")
        .replaceAll("\t", " ")
        .replaceAll(/ +(?= )/g,'')
        .trim()
 }


let lookupList: Array<HistoryEntry> = []

for (const uri of uris) {
    const page = await fetchDOM(uri);
    const tableData = page.getElementsByTagName("td");

    let currentArtistName: string = "";
    for(const td of tableData) {
        if(isArtistRow(td)) {
            currentArtistName = cleanText(td.textContent);
            continue;
        }
        
        const albumsWithNonDefaultPrice: Array<HistoryEntry> = []
        const linksForAlbumsWithDifferentPrice = td.getElementsByTagName("p").filter(p => p.hasAttribute("align"))
            .flatMap(paragraph => paragraph.getElementsByTagName("a"))
            for(const anchor of linksForAlbumsWithDifferentPrice) {
                const details = await fetchDOM(`${settings.BASE_URL}${anchor.getAttribute("href")}`)
                const [priceParagraph] = details.getElementsByTagName("td").filter(td => td.textContent?.toLowerCase()?.trim()?.startsWith("pris kr.") ?? false);
                if (priceParagraph === undefined) {
                    albumsWithNonDefaultPrice.push({
                        albumTitle: cleanText(anchor.textContent),
                        artist: currentArtistName,
                        price: DEFAULT_PRICE_IN_DKK
                    } as HistoryEntry);
                    continue;
                }

                const priceText = cleanText(priceParagraph.textContent)
                .replaceAll(/[^0-9]/g, "");

                const price = parseInt(priceText);

                albumsWithNonDefaultPrice.push({
                    albumTitle: cleanText(anchor.textContent),
                    artist: currentArtistName,
                    price: price
                } as HistoryEntry);
            }

        const albumsWithDefaultPrice = td.getElementsByTagName("a")
            .map(anchor => {
                return {
                    albumTitle: cleanText(anchor.textContent),
                    price: DEFAULT_PRICE_IN_DKK,
                    artist: currentArtistName
                } as HistoryEntry
            }).filter(defaultPricedAlbum => !albumsWithNonDefaultPrice.some(nondefaultedPricedAlbum => defaultPricedAlbum.albumTitle === nondefaultedPricedAlbum.albumTitle));
            
            lookupList = lookupList.concat(albumsWithDefaultPrice).concat(albumsWithNonDefaultPrice);
    }
}
interface HistoryEntry {
    artist: string;
    albumTitle: string;
    price: number;
}


Deno.writeTextFile("./cds.json", JSON.stringify(lookupList, null, '\t'));