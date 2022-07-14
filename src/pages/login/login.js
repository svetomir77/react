import React, {useState} from 'react';
import Center from "../../components/center/center";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useFieldChange} from "../../services/hooks/use-field-change";
import {Link} from "react-router-dom";
import AppHeader from "../../components/app-header/app-header";

function LoginPage() {
    const initialData = {
        email: "",
        password: "",
    };

    const [logInData, setLogInData] = useState(initialData);
    const handleChange = useFieldChange(setLogInData);

    return (
        <div className='page'>
            <AppHeader/>
            <Center>
                <form>
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
                    <section className='mt-6 mb-20'>
                        <Button type="primary" size="medium">
                            Войти
                        </Button>
                    </section>
                    <section className='mb-4 text text_type_main-default'>
                        <label className='text_color_inactive'>Вы - новый пользователь?</label> <Link
                        to='/register'>Зарегистрироваться</Link>
                    </section>
                    <section className='text text_type_main-default'>
                        <label className='text_color_inactive'>Забыли пароль?</label> <Link to='/forgot-password'>Восстановить
                        пароль</Link>
                    </section>
                </form>
            </Center>
        </div>
    );
}

export default LoginPage;
