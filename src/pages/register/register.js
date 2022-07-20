import React, {useState} from 'react';
import Center from "../../components/center/center";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useFieldChange} from "../../services/hooks/use-field-change";
import {Link, Redirect, useHistory} from "react-router-dom";
import AppHeader from "../../components/app-header/app-header";
import {useDispatch, useSelector} from "react-redux";
import {userCreate} from "../../services/slices/auth";
import {setCookie} from "../../utils/cookies";
import {useAuth} from "../../services/auth";

function RegisterPage() {
    const initialData = {
        name: '',
        email: '',
        password: '',
    };

    const [userData, setUserData] = useState(initialData);
    const handleChange = useFieldChange(setUserData);
    const dispatch = useDispatch();
    const history = useHistory();
    const {logged} = useAuth();
    const {refreshToken} = useSelector(store => store.auth);


    const onSubmit = (e) => {
        e.preventDefault();
        if (userData.name && userData.email && userData.password) {
            dispatch(userCreate(userData)).then(() => {
                setCookie('token', refreshToken);
                history.push('/');
            });
        }
    }

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
        <div className='page'>
            <AppHeader/>
            <Center>
                <form onSubmit={onSubmit}>
                    <p className="text text_type_main-medium label">
                        Регистрация
                    </p>
                    <section className='mt-6'>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={handleChange()}
                            value={userData.name}
                            name={'name'}
                            size={'default'}
                        />
                    </section>
                    <section className='mt-6'>
                        <Input
                            type={'text'}
                            placeholder={'E-mail'}
                            onChange={handleChange()}
                            value={userData.email}
                            name={'email'}
                            size={'default'}
                        />
                    </section>
                    <section className='mt-6'>
                        <PasswordInput onChange={handleChange()} value={userData.password} name={'password'}/>
                    </section>
                    <section className='mt-6 mb-20'>
                        <Button type="primary" size="medium">
                            Зарегистрироваться
                        </Button>
                    </section>
                    <section className='mb-4 text text_type_main-default'>
                        <label className='text_color_inactive'>Уже зарегистрированы?</label> <Link
                        to='/login'>Войти</Link>
                    </section>
                </form>
            </Center>
        </div>
    );
}

export default RegisterPage;
