import {FormEvent, SetStateAction} from "react";

const isFunc = (val: string) => typeof val === "function";

export const useFieldChange = (setState: SetStateAction<any>) => () => (fieldEvent: FormEvent<HTMLInputElement>) => {
    const field: any = fieldEvent.target;
    const {name, value} = field;
    setState((state:any) => ({
        ...state,
        [name]: isFunc(value) ? value(state[name]) : value,
    }));
};
