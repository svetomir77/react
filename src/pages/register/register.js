import React, {useState} from 'react';
import Center from "../../components/center/center";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useFieldChange} from "../../services/hooks/use-field-change";
import {Link} from "react-router-dom";
import AppHeader from "../../components/app-header/app-header";

function RegisterPage() {
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
                        Регистрация
                    </p>
                    <section className='mt-6'>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={handleChange()}
                            value={logInData.name}
                            name={'name'}
                            size={'default'}
                        />
                    </section>
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
