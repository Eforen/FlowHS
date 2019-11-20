export interface StringInstancedArray{
    [index: string]: object
}
export const ForEachObject = (obj: StringInstancedArray, call: (key: string, element: any) => void) => {
    for (let key of Object.keys(obj)) {
        let elem = obj[key];
        call(key, elem)
    }
}