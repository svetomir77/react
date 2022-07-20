import {useDispatch, useSelector} from "react-redux";
import {authLogin, authLogout, authToken, getUserAccess} from "./slices/auth";
import {getCookie} from "../utils/cookies";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";


export function useAuth() {
    let {accessToken, message} = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const logged = Boolean(getCookie('token'));

    const getUser = async () => {
        if (logged) {
            if (!accessToken) {
                return await dispatch(authToken()).then(async ({payload}) => {
                    return await dispatch(getUserAccess({token: payload.accessToken}));
                });
            }
            return await dispatch(getUserAccess({token: accessToken}));
        } else {
            return signIn();
        }
    };

    const signIn = async formData => {
        return await dispatch(authLogin(formData));
    };

    const signOut = async () => {
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
        getUser,
        signIn,
        signOut
    };
}
