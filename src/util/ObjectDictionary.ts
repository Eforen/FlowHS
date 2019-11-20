export interface StringInstancedArray{
    [index: string]: object
}
export const ObjectForEach = (obj: StringInstancedArray, call: (key: string, element: any) => void) => {
    for (let key of Object.keys(obj)) {
        let elem = obj[key];
        call(key, elem)
    }
}

export const ObjectFilter = (obj: StringInstancedArray, call: (element: any, key: string) => boolean, cloneIfUnchanged: boolean = false) => {
    for (let key of Object.keys(obj)) {
        let elem = obj[key];
        let newObj: any = {}
        let changed = false
        if(call(elem, key)){
            newObj[key] = elem
        } else {
            changed = true
        }
        if(changed == false && cloneIfUnchanged == false){
            return obj
        } else{
            return newObj
        }
    }
}