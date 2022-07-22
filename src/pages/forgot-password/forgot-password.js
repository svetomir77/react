import React, {useState} from 'react';
import Center from "../../components/center/center";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useFieldChange} from "../../services/hooks/use-field-change";
import {Link, Redirect} from "react-router-dom";
import {useDispatch} from "react-redux";
import {clearMessage, passwordResetRequest} from "../../services/slices/auth";
import {useAuth} from "../../services/auth";

function ForgotPasswordPage() {
    const initialData = {
        email: "",
    };

    const dispatch = useDispatch();

    const [logInData, setLogInData] = useState(initialData);
    const [actionMade, setActionMade] = useState(false);
    const handleChange = useFieldChange(setLogInData);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(clearMessage());
        setActionMade(true);

        const params = {
            email: logInData.email
        };
        dispatch(passwordResetRequest(params));
    }

    const {hasError, message, logged} = useAuth();

    if (logged) {
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
                    <Input
                        type={'text'}
                        placeholder={'Укажите е-mail'}
                        onChange={handleChange()}
                        value={logInData.email}
                        name={'email'}
                        size={'default'}
                    />
                </section>
                <section className='mt-6'>
                    <Button type="primary" size="medium">
                        Восстановить
                    </Button>
                </section>
                {actionMade && hasError && message && <section className='error mt-6'>{message}</section>}
                <section className='mb-4 mt-20 text text_type_main-default'>
                    <label className='text_color_inactive'>Вспомнили пароль?</label> <Link
                    to='/login'>Войти</Link>
                </section>
            </form>
        </Center>
    );
}

export default ForgotPasswordPage;
