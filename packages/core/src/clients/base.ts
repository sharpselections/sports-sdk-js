import axios, {AxiosInstance} from "axios";

export class SportsSdkClient {
    private readonly endpoint: string;
    protected session: AxiosInstance;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.session = axios.create({
            baseURL: this.endpoint,
            headers: {
                "Content-Type": "application/json",
            }
        })
    }
}