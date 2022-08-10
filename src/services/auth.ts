import {useDispatch, useSelector} from "react-redux";
import {authLogin, authLogout, authToken, getUserAccess} from "./slices/auth";
import {getCookie} from "../utils/cookies";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {TLogin} from "../utils/types";


export function useAuth() {
    let {accessToken, message, hasError} = useSelector((store: any) => store.auth);
    const dispatch = useDispatch();
    const logged = Boolean(getCookie('token'));

    const getUser = async () => {
        if (logged) {
            if (!accessToken) {
                // @ts-ignore
                return await dispatch(authToken()).then(async ({payload}) => {
                    // @ts-ignore
                    return await dispatch(getUserAccess({token: payload.accessToken}));
                });
            }
            // @ts-ignore
            return await dispatch(getUserAccess({token: accessToken}));
        } else {
            return signIn({email: '', password: ''});
        }
    };

    const signIn = async (formData: TLogin) => {
        // @ts-ignore
        return await dispatch(authLogin(formData));
    };

    const signOut = async () => {
        // @ts-ignore
        return await dispatch(authLogout());
    };

    const history = useHistory();

    useEffect(() => {
        switch (message) {
            case 'Reset email sent':
                history.push({
                    pathname: '/reset-password', state: {
                        from: 'forgot-password'
                    }
                });
                break;
            case 'Password successfully reset':
            case 'Jwt expired': {
                const logout = async () => {
                    return await signOut().then(() => {
                        history.replace({pathname: '/login'});
                    });
                }
                logout();
                break;
            }
            default:
                break;
        }
    }, [message, history, dispatch]);

    return {
        logged,
        message,
        hasError,
        getUser,
        signIn,
        signOut
    };
}

