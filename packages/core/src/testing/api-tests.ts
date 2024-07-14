import nock from "nock";

export interface ApiTestCases<T> {
    // method to call on the passed client
    method: keyof T;
    // path to mock
    path: string;
    // whether query params will be passed
    query: boolean;
    // expected response result
    expectedResponse: any;
    // properties to ensure are present
    properties: Array<string>;
}

export const nockApiTests = <T>(client: T, nockEndpoint: nock.Scope, testCases: Array<ApiTestCases<T>>) => {
    afterEach(() => {
        nock.cleanAll();
    });
    describe("with nock", () => {
        testCases.forEach(({ method, path, expectedResponse, query }) => {
            test(`getting ${path}`, async () => {
                nockEndpoint.get(path).query(query).reply(200, expectedResponse);
                const result = await (client[method] as (params: any) => Promise<any>)({});
                expect(result).toEqual(expectedResponse);
            });
        });
    });
};

export const liveApiTests = <T>(client: T, testCases: Array<ApiTestCases<T>>) => {
    describe("with the live endpoint", () => {
        testCases.forEach(({ method, path, properties }) => {
            test(`getting ${path}`, async () => {
                const result = await (client[method] as (params: any) => Promise<any>)({});
                properties?.forEach(property => {
                    expect(result).toHaveProperty(property);
                });
            });
        });
    });
};

export const allApiTests = <T>({ client, testCases, nockEndpoint }: {
    client: T,
    nockEndpoint: nock.Scope,
    testCases: Array<ApiTestCases<T>>
}) => {
    nockApiTests<T>(client, nockEndpoint, testCases);
    liveApiTests<T>(client, testCases);
};
