import React, {useState} from 'react';
import Center from "../../components/center/center";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useFieldChange} from "../../services/hooks/use-field-change";
import {Link} from "react-router-dom";
import AppHeader from "../../components/app-header/app-header";

function ForgotPasswordPage() {
    const initialData = {
        email: "",
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
                        <Button type="primary" size="medium">
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
