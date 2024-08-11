import axios, {AxiosInstance} from "axios";

export class SportsSdkClient {
    protected readonly endpoint: string;
    public session: AxiosInstance;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.session = axios.create({
            baseURL: this.endpoint,
            headers: {
                "Content-Type": "application/json",
            },
			validateStatus: function(status) {
                // Axios marks 304 as an error, but clients should accept and handle 304
				return status < 300 || status == 304;
			},
        })
    }
}