import React, {useEffect, useState} from 'react';
import Center from "../../components/center/center";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useFieldChange} from "../../services/hooks/use-field-change";
import {Link, useHistory} from "react-router-dom";
import AppHeader from "../../components/app-header/app-header";
import {useDispatch, useSelector} from "react-redux";
import {passwordResetRequest} from "../../services/slices/profile";

function ForgotPasswordPage() {
    const initialData = {
        email: "",
    };

    const dispatch = useDispatch();

    const [logInData, setLogInData] = useState(initialData);
    const handleChange = useFieldChange(setLogInData);

    const onClick = () => {
        const params = {
            email: logInData.email
        };
        dispatch(passwordResetRequest(params));
    }

    const message = useSelector((store) => {
        return store.profile.message;
    });
    const history = useHistory();

    useEffect(() => {
        switch(message) {
            case 'Reset email sent':
                return history.push({ pathname: '/reset-password' });
            case 'Password successfully reset':
                return history.replace({ pathname: '/login' });
        }
    }, [message]);

    return (
        <div className='page'>
            <AppHeader/>
            <Center>
                <form>
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
                    <section className='mt-6 mb-20'>
                        <Button type="primary" size="medium" onClick={onClick}>
                            Восстановить
                        </Button>
                    </section>
                    <section className='mb-4 text text_type_main-default'>
                        <label className='text_color_inactive'>Вспомнили пароль?</label> <Link
                        to='/login'>Войти</Link>
                    </section>
                </form>
            </Center>
        </div>
    );
}

export default ForgotPasswordPage;
