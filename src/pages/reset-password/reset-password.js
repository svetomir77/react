import React, {useState} from 'react';
import Center from "../../components/center/center";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useFieldChange} from "../../services/hooks/use-field-change";
import {Link} from "react-router-dom";
import AppHeader from "../../components/app-header/app-header";

function ResetPasswordPage() {
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
                        Восстановление пароля
                    </p>

                    <section className='mt-6'>
                        <PasswordInput onChange={handleChange()} value={logInData.password} name={'password'} placeholder={'Введите новый пароль'}/>
                    </section>
                    <section className='mt-6'>
                        <Input
                            type={'text'}
                            placeholder={'Введите код из письма'}
                            onChange={handleChange()}
                            value={logInData.email}
                            name={'email'}
                            size={'default'}
                        />
                    </section>
                    <section className='mt-6 mb-20'>
                        <Button type="primary" size="medium">
                            Сохранить
                        </Button>
                    </section>
                    <section className='mb-4 text text_type_main-default'>
                        <label className='text_color_inactive'>Вспомнили пароль?</label> <Link
                        to='/register'>Войти</Link>
                    </section>
                </form>
            </Center>
        </div>
    );
}

export default ResetPasswordPage;
