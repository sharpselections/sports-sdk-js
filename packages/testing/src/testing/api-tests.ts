import nock from "nock";

export interface ApiTestCases<T> {
    // if properties and passes are undefined, live endpoint tests will not run
    liveTests?: {
        // naive test to ensure the method doesn't throw an error
        passes?: boolean;
        // properties to ensure are present
        properties?: Array<string>;
    },
    // method to call on the passed client
    method: keyof T;
    name?: string;
    nockTests?: {
        // expected response result
        expectedResponse: any;
        // expected result from the method call; if undefined expectedResponse will be passed in the expect case
        expectedResult?: any;
        // path to mock
        path: string;
        // whether query params will be passed
        query: boolean;
    },
    // parameters to pass to method call
    params?: any;
}

export const nockApiTests = <T>(client: T, nockEndpoint: nock.Scope, testCases: Array<ApiTestCases<T>>, sleep?: number) => {
    afterEach(() => {
        nock.cleanAll();
    });
    describe("with nock", () => {
        testCases.forEach(async ({method, nockTests, params, name}) => {
            if (nockTests) {
                const {path, expectedResult, expectedResponse, query} = nockTests;
                test((name || `getting ${path}`), async () => {
                    nockEndpoint.get(path).query(query).reply(200, expectedResponse);
                    const result = await (client[method] as (params: any) => Promise<any>)(params ?? {});
                    expect(result).toEqual(expectedResult ?? expectedResponse);
                });
                if (sleep) {
                    await testSleep(sleep);
                }
            }
        });
    });
};

export const liveApiTests = <T>(client: T, testCases: Array<ApiTestCases<T>>, sleep?: number) => {
    describe("with the live endpoint", () => {
        testCases.forEach(async ({method, liveTests, params, name}) => {
            if (liveTests) {
                const {passes, properties} = liveTests;
                if (passes !== undefined || properties?.length) {
                    test((name || `getting ${method.toString()}`), async () => {
                        try {
                            const result = await (client[method] as (params: any) => Promise<any>)(params ?? {});
                            properties?.forEach(property => {
                                expect(result).toHaveProperty(property);
                            });
                            if (passes) {
                                expect(passes).toEqual(true);
                            }
                        } catch (error) {
                            if (passes) {
                                console.log(error);
                                expect(passes).toEqual(false);
                            }
                        }
                    });
                }
                if (sleep) {
                    await testSleep(sleep);
                }
            }
        });
    });
};

export const allApiTests = <T>({client, testCases, nockEndpoint, sleep}: {
    client: T,
    nockEndpoint: nock.Scope,
    sleep?: number;
    testCases: Array<ApiTestCases<T>>
}) => {
    nockApiTests<T>(client, nockEndpoint, testCases, sleep);
    liveApiTests<T>(client, testCases, sleep);
};

function testSleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
