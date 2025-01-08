export const arrayTypeParamsConverter = (param: string | string[]) => {
    if(typeof param === 'string' && param.length > 0) {
        return [param];
    } else {
        return param as string[];
    }
}