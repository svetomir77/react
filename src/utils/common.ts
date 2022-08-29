import {isDone, isPending} from "./types";

export const getStatus = (statusId: string) => {
    let status = 'Отменён';
    switch (statusId) {
        case isDone:
            status = 'Выполнен';
            break;
        case isPending:
            status = 'Готовится';
            break;
    }
    return status;
}

export const cleanToken = (token: string | null) => {
    return token && token.replace(/^Bearer /, '');
}
