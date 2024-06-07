import { DOMParser, HTMLDocument, Element } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';

const settings = {
    BASE_URL: "https://cd6000.dk/"
}

async function fetchDOM(url: string): Promise<HTMLDocument> {
    const response = await fetch(url);
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

type AlbumLookupByArtist = {[artist: string]: Array<string>};

const lookupList = await Promise.all(uris.map(async uri => {
    const page = await fetchDOM(uri);
    const tableData = page.getElementsByTagName("td");

    let currentArtist: string;
    const lookup = tableData.reduce((previousValue, td) => {
        if(isArtistRow(td)) {
            currentArtist = cleanText(td.textContent)
             ;
            return {
                ...previousValue,
                [currentArtist]: []
            };
        }
        const albums = td.getElementsByTagName("a")
            .map(anchor => anchor.textContent)
            .map(text => cleanText(text));

        return {
            ...previousValue,
            [currentArtist]: previousValue[currentArtist].concat(albums)
        };

    }, {} as AlbumLookupByArtist)

    return lookup;
}));

const artistLookup = lookupList.reduce((previousValue, currentValue) => {
    return {
        ...currentValue,
        ...previousValue
    }
}, {} as AlbumLookupByArtist);

Deno.writeTextFile("./cds.json", JSON.stringify(artistLookup, null, '\t'));