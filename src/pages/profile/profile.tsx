import React, {FC, FormEvent, SyntheticEvent, useCallback, useEffect, useState} from 'react';
import {Button as ButtonUI, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useFieldChange} from "../../services/hooks/use-field-change";
import {Link, useHistory} from "react-router-dom";
import styles from "./profile.module.css";
import {useAuth} from "../../services/auth";
import {useDispatch, useSelector} from "react-redux";
import {userUpdate} from "../../services/slices/auth";
import {TButton} from "../../utils/types";

const Button: TButton = ButtonUI;


export const ProfilePage: FC = () => {
    let {hasError, user, accessToken, message} = useSelector((store: any) => store.auth);
    const [isFormDirty, setIsFormDirty] = useState(false);
    const initialData = {...user, password: ''} || {
        name: "",
        email: "",
        password: "",
    };

    const [profileData, setProfileData] = useState(initialData);
    const handleChange = useFieldChange(setProfileData);

    const auth = useAuth();
    const history = useHistory();
    const logout = useCallback(
        () => {
            auth.signOut().then(() => {
                history.replace({pathname: '/login'});
            });
        },
        [auth, history]
    );

    const dispatch = useDispatch();

    const onCancel = (e: SyntheticEvent) => {
        e.preventDefault();
        setProfileData({...user, password: ''});
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = {token: accessToken, body: profileData};
        // @ts-ignore
        dispatch(userUpdate(params));
    }

    useEffect(() => {
        setIsFormDirty(JSON.stringify(profileData) !== JSON.stringify({...user, password: ''}));
    }, [profileData, user]);

    return (
        <section className={styles.main}>
            <section className={`${styles.colLeft} mr-15 text text_type_main-medium`}>
                <h3 className={`${styles.header} text_type_main-medium`}>Профиль</h3>
                <section className={`${styles.link} text_color_inactive`}><Link to='/profile/orders'>История
                    заказов</Link></section>
                <section className={`${styles.link} text_color_inactive`}><a onClick={logout}
                                                                             className={styles.rawLink}>Выход</a>
                </section>
                <section className={`${styles.info} mt-20 text text_type_main-small text_color_inactive`}>
                    В этом разделе вы можете изменить свои персональные данные
                </section>
            </section>
            <section className={`${styles.colRight}`}>
                <form onSubmit={onSubmit}>
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
                    {isFormDirty &&
                    <section className={`${styles.buttons} mt-10`}>
                        <Button>Сохранить</Button><span className='mr-6'></span><Button
                        onClick={onCancel}>Отмена</Button>
                    </section>
                    }
                    {hasError && message && <section className='error mt-6'>{message}</section>}
                </form>
            </section>
        </section>
    );
}
