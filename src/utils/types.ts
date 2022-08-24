import React, {SyntheticEvent} from "react";

export type TIngredient = {
    _id: string,
    name: string,
    type: 'bun' | 'sauce' | 'main',
    fat: number,
    proteins: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile?: string,
    image_large?: string,
    __v?: number,
};

export type TIngredientUid = TIngredient & { uuid: string };

export type TIngredients = TIngredient[];

export type TIngredientsUid = TIngredientUid[];

export type TBurgerIngredientUidProps = {
    ingredient: TIngredientUid,
}
export type TBurgerIngredientProps = {
    ingredient: TIngredient,
}

export type TOnClose = ((e: SyntheticEvent | KeyboardEvent) => void)

export type LocationState = {
    ingredient?: TIngredient;
    from?: string;
}

export type TLogin = {
    email: string,
    password: string
}

export type TUser = TLogin & {
    name: string;
}

export type TOrderIngredients = {
    ingredients: string[];
}

export type TToken = {
    token: string | null;
}

export type TButton = React.FC<{
    type?: 'secondary' | 'primary';
    size?: 'small' | 'medium' | 'large';
    onClick?: (() => void) | ((e: SyntheticEvent) => void);
    disabled?: boolean;
    name?: string;
    htmlType?: 'button' | 'submit' | 'reset';
    children: React.ReactNode;
}>

export type TAuthState = {
    accessToken: string | null,
    refreshToken: string | null,
    user: {
        email: string,
        name: string,
    },
    message: string | null,
    isLoading: boolean,
    hasError: boolean,
}

export const isDone = 'done';
export const isPending = 'pending';
export const isCreated = 'created';
export type TStatus = typeof isDone | typeof isPending | typeof isCreated;
export type TOrder = {
    _id: string;
    ingredients: string[];
    status: TStatus;
    number: number;
    name: string;
    createdAt:string;
    updatedAt:string;
}

export type TFeedState = {
    orders: TOrder[] | [];
    total: number;
    totalToday: number;
    connecting: boolean;
    online: boolean;
    connectionError: string | null;
}
