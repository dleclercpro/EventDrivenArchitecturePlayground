import { HttpStatusCode } from '../types/HTTPTypes';

export type CallMethod = 'GET' | 'PUT' | 'POST' | 'DELETE';
export type CallResponse<Data> = {
    code: HttpStatusCode,
    data: Data,
};

abstract class Call<RequestData = void, ResponseData = void> {
    protected abstract method: CallMethod;
    protected url: string;

    public constructor(url: string) {
        this.url = url;
    }

    public async execute(data?: RequestData) {
        const options = {
            method: this.method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };

        const res = await fetch(this.url, options);
        const json = await res.json() as CallResponse<ResponseData>;

        return json;
    }
}

export default Call;