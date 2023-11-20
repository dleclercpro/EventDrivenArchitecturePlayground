export type CallMethod = 'GET' | 'PUT' | 'POST' | 'DELETE';



abstract class Call<Data = void, ResponseData = void> {
    protected abstract method: CallMethod;
    protected url: string;

    public constructor(url: string) {
        this.url = url;
    }

    public async execute(data?: Data) {
        const options = {
            method: this.method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };

        const res = await fetch(this.url, options);
        const json = await res.json() as ResponseData;

        return json;
    }
}

export default Call;