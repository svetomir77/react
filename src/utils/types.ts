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

export type TBurgerIngredientProps = {
    ingredient: TIngredientUid,
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

export type TToken = {
    token?: string;
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
