export type Event<Data = any> = {
    id: string,
    name: string,
    data?: Data,
}

export type Service = {
    uri: string,
};