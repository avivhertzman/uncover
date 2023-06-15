import { Module, Res } from '@nestjs/common';
import { ImageFetcher } from './image-fetcher.service';

@Module({
    providers: [ImageFetcher],
    exports: [ImageFetcher]
})
export class ImageFetcherModule { }