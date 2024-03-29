import styles from "../../components/app/app.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BurgerIngredients} from "../../components/burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../../components/burger-constructor/burger-constructor";
import {useSelector} from "../../services/store";

export const HomePage = () => {
    const {items: ingredients, isLoading, hasError} = useSelector((store) => store.ingredients);

    return (
        <main className={styles.main}>
            <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
            <DndProvider backend={HTML5Backend}>
                <section className={styles.container}>
                    {isLoading && <div className="centerText">Загрузка...</div>}
                    {hasError && <div className="centerText error">{hasError}</div>}
                    {!isLoading &&
                    !hasError &&
                    ingredients.length &&
                    <>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </>
                    }
                </section>
            </DndProvider>
        </main>
    );
}
