import React, {FC, FormEvent, useState} from 'react';
import {Center} from "../../components/center/center";
import {Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useFieldChange} from "../../services/hooks/use-field-change";
import {Link, Redirect, useLocation} from "react-router-dom";
import {useAuth} from "../../services/auth";
import {clearMessage} from "../../services/slices/auth";
import {useDispatch} from "react-redux";
import {LocationState, TButton} from "../../utils/types";
import {Button} from "../../components/Button";

export const LoginPage: FC = () => {
    const initialData = {
        email: "",
        password: "",
    };
    const dispatch = useDispatch();
    const [logInData, setLogInData] = useState(initialData);
    const [actionMade, setActionMade] = useState(false);
    const handleChange = useFieldChange(setLogInData);
    let {hasError, message, signIn, logged} = useAuth();
    const location = useLocation();
    const state = location.state as LocationState;

    if (logged) {
        return (
            <Redirect to={state?.from || '/'}/>
        );
    }
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        dispatch(clearMessage());
        setActionMade(true);
        e.preventDefault();
        if (logInData.email && logInData.password) {
            signIn(logInData);
        }
    }

    return (
        <Center>
            <form onSubmit={onSubmit}>
                <p className="text text_type_main-medium label">
                    Вход
                </p>
                <section className='mt-6'>
                    <Input
                        type={'text'}
                        placeholder={'E-mail'}
                        onChange={handleChange()}
                        value={logInData.email}
                        name={'email'}
                        size={'default'}
                    />
                </section>
                <section className='mt-6'>
                    <PasswordInput onChange={handleChange()} value={logInData.password} name={'password'}/>
                </section>
                <section className='mt-6'>
                    <Button type="primary" size="medium">
                        Войти
                    </Button>
                </section>
                {actionMade && hasError && message && <section className='error mt-6'>{message}</section>}
                <section className='mb-4 mt-20 text text_type_main-default'>
                    <label className='text_color_inactive'>Вы - новый пользователь?</label> <Link
                    to='/register'>Зарегистрироваться</Link>
                </section>
                <section className='text text_type_main-default'>
                    <label className='text_color_inactive'>Забыли пароль?</label> <Link to='/forgot-password'>Восстановить
                    пароль</Link>
                </section>
            </form>
        </Center>
    );
}
