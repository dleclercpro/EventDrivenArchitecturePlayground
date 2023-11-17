export const prettifyJSON = (json: object) => JSON.stringify(json, undefined, 2);

export const parseBooleanText = (text: string) => {
    return [true, 'true'].includes(text);
}