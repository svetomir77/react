import {useAuth} from '../services/auth';
import {Redirect, Route} from 'react-router-dom';
import {useEffect, useState} from 'react';

export function ProtectedRoute({children, ...rest}) {
    const {getUser, logged} = useAuth();
    const [isUserLoaded, setUserLoaded] = useState(false);

    const init = async () => {
        await getUser();
        setUserLoaded(true);
    };

    useEffect(() => {
        init();
    }, []);

    if (!isUserLoaded) {
        return null;
    }

    return (
        <Route
            {...rest}
            render={({location}) =>
                logged ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}
