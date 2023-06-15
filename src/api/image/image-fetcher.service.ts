import { Injectable } from "@nestjs/common";
import fetch from 'cross-fetch';
import { Buffer } from "buffer"

@Injectable()
export class ImageFetcher {
    constructor() { }
    async getBuffer(picUrl: string) {
        let fileImg = await fetch(picUrl);
        let asbuffer = Buffer.from(await fileImg.arrayBuffer());
        return asbuffer;
    }
}