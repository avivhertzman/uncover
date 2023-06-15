import { CandidatesScoringManager } from "./candidates-scoring-manager.service";
import { TestingModule, Test } from "@nestjs/testing";
import { ImageFetcher } from "../../api/image/image-fetcher.service";
import { IScoringFetcherDal } from "../../core";
import { HttpException } from "@nestjs/common";

describe('CandidatesScoringManager', () => {
    let service: CandidatesScoringManager;
    const imageFetcherService = {
        getBuffer: jest.fn(() => Promise.resolve([])),
    };
    const scoringFetcherService = {
        getScoring: jest.fn(() => Promise.resolve(1)),
    };
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CandidatesScoringManager,
                {
                    provide: ImageFetcher,
                    useValue: imageFetcherService,
                },
                {
                    provide: IScoringFetcherDal,
                    useValue: scoringFetcherService,
                },
            ],
        }).compile();
        service = await module.get(CandidatesScoringManager);
    });
    afterEach(() => jest.clearAllMocks());
    describe('getWithSubTasks', () => {
        let requestMock;
        let getScoringSpy;
        let answer;
        let imageFetcherSpy;
        beforeEach(async () => {
            requestMock = {
                candidates: [
                    {
                        username: "_tylerzwise_",
                        profile_pic_url_hd:
                            "https://smip-users-media.s3.us-east-1.amazonaws.com/home-task-impersonators/330199544_251674530521603_4851066537436589801_n.jpg"
                    }],
                user: {
                    username: "_tylerzwise_",
                    profile_pic_url_hd:
                        "https://smip-users-media.s3.us-east-1.amazonaws.com/home-task-impersonators/330199544_251674530521603_4851066537436589801_n.jpg"

                }
            }
            getScoringSpy = jest.spyOn(scoringFetcherService, 'getScoring').mockImplementation(() => Promise.resolve(10));
            imageFetcherSpy = jest.spyOn(imageFetcherService, 'getBuffer');
        })
        describe('when all returns ok', () => {
            beforeEach(async () => {
                answer = await service.getCandidatesScoring(requestMock);
            })
            it('should return right score', async () => {
                expect(answer).toEqual([{ "similarityScore": 10, "username": "_tylerzwise_" }])
            })
            it('should call get scoring one', async () => {
                expect(getScoringSpy).toHaveBeenCalledTimes(1);
            })
            it('should call image fetcher twice', async () => {
                expect(imageFetcherSpy).toHaveBeenCalledTimes(2);
            })
        })

        describe("when getBuffer return error for all requests", () => {
            beforeEach(async () => {
                imageFetcherSpy = jest.spyOn(imageFetcherService, 'getBuffer').mockImplementationOnce(() => {
                    throw new HttpException("not valid", 400);
                });
            })
            it('should throw error', async () => {
                try {
                    await service.getCandidatesScoring(requestMock)
                } catch (e) {
                    expect(e).toEqual(new HttpException('error retrieveing impersonators for user _tylerzwise_ because of HttpException: not valid', 400));
                }
            })
        })
        describe("when getBuffer return error for the candidate", () => {
            beforeEach(async () => {
                imageFetcherSpy = jest.spyOn(imageFetcherService, 'getBuffer').mockResolvedValueOnce([]).mockImplementationOnce(() => {
                    throw new HttpException("not valid", 400);
                });
                answer = await service.getCandidatesScoring(requestMock);
            })
            it('should return empty response', async () => {
                expect(answer).toEqual([]);
            })
            it('should not call getScoring', async () => {
                expect(getScoringSpy).toHaveBeenCalledTimes(0);
            })
        })
    })
})