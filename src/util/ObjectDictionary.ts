export interface StringInstancedArray{
    [index: string]: object
}
export const ObjectForEach = (obj: StringInstancedArray, call: (key: string, element: any) => void) => {
    for (let key of Object.keys(obj)) {
        let elem = obj[key];
        call(key, elem)
    }
}

export const ObjectFilter = (obj: StringInstancedArray, filter: (element: any, key: string) => boolean, cloneIfUnchanged: boolean = false) => {
    for (let key of Object.keys(obj)) {
        let elem = obj[key];
        let newObj: any = {}
        let changed = false
        if(filter(elem, key)){
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

/**
 * Returns the first element of String Based Array that matches the filter func
 * @param obj The object to search
 * @param filter The filter to check elements with
 */
export const ObjectFind = (obj: StringInstancedArray, filter: (element: any, key: string) => boolean) => {
    for (let key of Object.keys(obj)) {
        let elem = obj[key];
        if (filter(elem, key)){
            return {key, value: elem}
        }
    }
    return undefined
}

/**
 * Uses a function to return a count of something. 
 * The call will be passed each object and the number returned will be 
 * summed together before being returned from this function.
 * @param obj Object to run function on
 * @param call Function to use for counting the elements.
 */
export const ObjectCount = (obj: StringInstancedArray, call: (element: any, key: string) => number) => {
    for (let key of Object.keys(obj)) {
        let elem = obj[key];
        let newObj: any = {}
        let count = 0
        count += call(elem, key)
        return count
    }
    return 0
}