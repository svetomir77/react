import React, {useState} from 'react';
import Center from "../../components/center/center";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useFieldChange} from "../../services/hooks/use-field-change";
import {Link} from "react-router-dom";
import styles from "./profile.module.css";
import AppHeader from "../../components/app-header/app-header";

function ProfilePage() {
    const initialData = {
        name: "",
        email: "",
        password: "",
    };

    const [profileData, setProfileData] = useState(initialData);
    const handleChange = useFieldChange(setProfileData);

    return (
        <div className='page'>
            <AppHeader/>
            <section className={styles.main}>
                <section className={`${styles.colLeft} mr-15 text text_type_main-medium`}>
                    <h3 className={`${styles.header} text_type_main-medium`}>Профиль</h3>
                    <section className={`${styles.link} text_color_inactive`}><Link to='/profile/orders'>История заказов</Link></section>
                    <section className={`${styles.link} text_color_inactive`}><Link to='/logout'>Выход</Link></section>
                    <section className={`${styles.info} mt-20 text text_type_main-small text_color_inactive`}>
                        В этом разделе вы можете изменить свои персональные данные
                    </section>
                </section>
                <section className={`${styles.colRight}`}>
                    <form>
                        <section className='mt-6'>
                            <Input
                                type={'text'}
                                placeholder={'Имя'}
                                onChange={handleChange()}
                                value={profileData.name}
                                name={'name'}
                                size={'default'}
                                icon={'EditIcon'}
                            />
                        </section>
                        <section className='mt-6'>
                            <Input
                                type={'text'}
                                placeholder={'Логин'}
                                onChange={handleChange()}
                                value={profileData.email}
                                name={'email'}
                                size={'default'}
                                icon={'EditIcon'}
                            />
                        </section>
                        <section className='mt-6'>
                            <Input
                                type={'password'}
                                placeholder={'Пароль'}
                                onChange={handleChange()}
                                value={profileData.password}
                                name={'password'}
                                size={'default'}
                                icon={'EditIcon'}
                            />
                        </section>
                    </form>
                </section>
            </section>
        </div>
    );
}

export default ProfilePage;
