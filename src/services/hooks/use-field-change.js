const isFunc = val => typeof val === "function";

export const useFieldChange = setState => fieldName => fieldEvent => {
    const field = fieldEvent.target;
    const {name, value} = field;
    setState(state => ({
        ...state,
        [name]: isFunc(value) ? value(state[name]) : value,
    }));
};
