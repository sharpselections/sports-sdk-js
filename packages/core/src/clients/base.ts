import axios, {AxiosInstance} from "axios";

export class SportsSdkClient {
    public readonly endpoint: string;
    public session: AxiosInstance;

    constructor(endpoint: string, session?: AxiosInstance) {
        this.endpoint = endpoint;
        this.session = session || axios.create({
            baseURL: this.endpoint,
            headers: {
                "Content-Type": "application/json",
            },
        })
    }
}