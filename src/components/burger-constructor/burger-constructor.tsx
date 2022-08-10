import React, {FC} from "react";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructor from "./burger-constructor.module.css";
import {BurgerStructure} from "./structure/structure";
import OrderButton from "./order-button/order-button";
import {DropTargetMonitor, useDrop} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import {addBun, addIngredient, changeIngredientPosition} from "../../services/slices/burger";
import {TIngredient} from "../../utils/types";

export const BurgerConstructor: FC = () => {
    const dispatch = useDispatch();
    const {bun} = useSelector((store: any) => store.burger);
    let overIngredient: Element | null;
    const onDrop = (ingredient: TIngredient, monitor: DropTargetMonitor) => {
        const dragType = monitor.getItemType();
        overIngredient && overIngredient.classList.remove("over");
        if (ingredient.type === "bun") {
            dispatch(addBun(ingredient));
        } else {
            const currentUuid =
                overIngredient && overIngredient.getAttribute("data-uuid");
            if (dragType === "ingredient") {
                dispatch(addIngredient({ingredient, before: currentUuid}));
            } else {
                dispatch(changeIngredientPosition({ingredient, before: currentUuid}));
            }
        }
    };
    const onHover = (ingredient: TIngredient, monitor: DropTargetMonitor) => {
        const position = monitor.getClientOffset();
        const targetElements = document.elementsFromPoint(position!.x, position!.y);
        const [currentTarget] = targetElements.filter(el => el.tagName === "LI");
        const [isBottom] = targetElements.filter(el =>
            el.classList.contains("constructor-element_pos_bottom")
        );
        if (currentTarget) {
            overIngredient && overIngredient?.parentElement?.classList.remove("over");
            const currentUuid = currentTarget.getAttribute("data-uuid");
            const prevUuid =
                overIngredient && overIngredient.getAttribute("data-uuid");
            if (prevUuid !== currentUuid) {
                overIngredient && overIngredient.classList.remove("over");
                currentTarget.classList.add("over");
                overIngredient = currentTarget;
            }
        } else if (isBottom) {
            overIngredient && overIngredient.classList.remove("over");
            overIngredient = null;
        }
    };
    const [{isHover}, dropTarget] = useDrop({
        accept: ["ingredient", "burgerIngredient"],
        drop(item: TIngredient, monitor) {
            onDrop(item, monitor);
        },
        hover(item: TIngredient, monitor) {
            if (item.type !== "bun") {
                onHover(item, monitor);
            }
        },
        collect: (monitor: DropTargetMonitor) => ({
            isHover: monitor.isOver()
        })
    });
    return (
        <section className={`${burgerConstructor.main}`}>
            <div
                className={`${burgerConstructor.dropTarget} ${
                    isHover ? burgerConstructor.dropHover : ""
                }`}
                ref={dropTarget}
            >
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
                <section className={`${burgerConstructor.scrollWrap} scroller`}>
                    <BurgerStructure/>
                </section>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>
            <OrderButton/>
        </section>
    );
}
