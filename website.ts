import { DomClient } from "./domclient.ts"
import { Element } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';
import { SETTINGS } from "./settings.ts";
import { AlbumPage } from "./AlbumPage.ts";

export class Website {
    private client: DomClient;
    constructor() {
        this.client = new DomClient(SETTINGS.BASE_URL);
    }

    async getPages(): Promise<Array<AlbumPage>> {
        const homepageDOM = await this.client.fetchDOM();
        const menuAnchors: Array<Element> = homepageDOM.getElementsByTagName('span').flatMap(span => span.getElementsByTagName("a")).filter(anchor => anchor.getAttribute("target") === "I1");
        const uris: Array<string> = menuAnchors.map(anchor => `${SETTINGS.BASE_URL}${anchor.getAttribute("href")}`)

        return uris.map(uri => new AlbumPage(uri));
    }
}
