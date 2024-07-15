import nock from "nock";

export interface ApiTestCases<T> {
    // method to call on the passed client
    method: keyof T;
    nockTests?: {
        // path to mock
        path: string;
        // whether query params will be passed
        query: boolean;
        // expected response result
        expectedResponse: any;
        // expected result from the method call; if undefined expectedResponse will be passed in the expect case
        expectedResult?: any;
    }
    // if properties and passes are undefined, live endpoint tests will not run
    liveTests?: {
        // properties to ensure are present
        properties?: Array<string>;
        // naive test to ensure the method doesn't throw an error
        passes?: boolean;
    }
    // parameters to pass to method call
    params?: any
}

export const nockApiTests = <T>(client: T, nockEndpoint: nock.Scope, testCases: Array<ApiTestCases<T>>) => {
    afterEach(() => {
        nock.cleanAll();
    });
    describe("with nock", () => {
        testCases.forEach(({method,  nockTests, params}) => {
            if (nockTests) {
                const {path, expectedResult, expectedResponse, query} = nockTests;
                test(`getting ${path}`, async () => {
                    nockEndpoint.get(path).query(query).reply(200, expectedResponse);
                    const result = await (client[method] as (params: any) => Promise<any>)(params ?? {});
                    expect(result).toEqual(expectedResult ?? expectedResponse);
                });
            }
        });
    });
};

export const liveApiTests = <T>(client: T, testCases: Array<ApiTestCases<T>>) => {
    describe("with the live endpoint", () => {
        testCases.forEach(({method, liveTests, params}) => {
            if (liveTests) {
                const {passes, properties} = liveTests;
                if (passes !== undefined || properties?.length) {
                    test(`getting ${method.toString()}`, async () => {
                        try {
                            const result = await (client[method] as (params: any) => Promise<any>)(params ?? {});
                            properties?.forEach(property => {
                                expect(result).toHaveProperty(property);
                            });
                            if (passes){
                                expect(passes).toEqual(true);
                            }
                        } catch (error) {
                            if (passes){
                                console.log(error);
                                expect(passes).toEqual(false);
                            }
                        }
                    });
                }
            }
        });
    });
};

export const allApiTests = <T>({client, testCases, nockEndpoint}: {
    client: T,
    nockEndpoint: nock.Scope,
    testCases: Array<ApiTestCases<T>>
}) => {
    nockApiTests<T>(client, nockEndpoint, testCases);
    liveApiTests<T>(client, testCases);
};
