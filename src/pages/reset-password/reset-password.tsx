import React, {FC, FormEvent, useState} from 'react';
import {Center} from "../../components/center/center";
import {Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useFieldChange} from "../../services/hooks/use-field-change";
import {Link, Redirect, useLocation} from "react-router-dom";
import {clearMessage, passwordResetUpdate} from "../../services/slices/auth";
import {useAuth} from "../../services/auth";
import {LocationState} from "../../utils/types";
import {Button} from "../../components/Button";
import {useDispatch} from "../../services/store";

export const ResetPasswordPage: FC = () => {
    const initialData = {
        token: "",
        password: "",
    };

    const [logInData, setLogInData] = useState(initialData);
    const [actionMade, setActionMade] = useState(false);
    const handleChange = useFieldChange(setLogInData);

    const {hasError, message, logged} = useAuth();
    const dispatch = useDispatch();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        dispatch(clearMessage());
        setActionMade(true);
        e.preventDefault();

        const params = {
            password: logInData.password,
            token: logInData.token,
        };
        dispatch(passwordResetUpdate(params));
    }

    const location = useLocation();
    const state = location.state as LocationState;

    if (logged || state?.from !== 'forgot-password') {
        return (
            <Redirect
                to={{
                    pathname: '/'
                }}
            />
        );
    }

    return (
        <Center>
            <form onSubmit={onSubmit}>
                <p className="text text_type_main-medium label">
                    Восстановление пароля
                </p>

                <section className='mt-6'>
                    <PasswordInput onChange={handleChange()} value={logInData.password} name={'password'}/>
                </section>
                <section className='mt-6'>
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={handleChange()}
                        value={logInData.token}
                        name={'token'}
                        size={'default'}
                    />
                </section>
                <section className='mt-6'>
                    <Button type="primary" size="medium">
                        Сохранить
                    </Button>
                </section>
                {actionMade && hasError && message && <section className='error mt-6'>{message}</section>}
                <section className='mb-4 mt-20 text text_type_main-default'>
                    <label className='text_color_inactive'>Вспомнили пароль?</label> <Link
                    to='/register'>Войти</Link>
                </section>
            </form>
        </Center>
    );
}
