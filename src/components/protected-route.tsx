import {useAuth} from '../services/auth';
import {Redirect, Route, RouteProps} from 'react-router-dom';
import {FC, ReactNode, useEffect, useState} from 'react';

interface Props extends RouteProps {
    children: ReactNode;
}

export const ProtectedRoute: FC<Props> = ({children, ...rest}) => {
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
