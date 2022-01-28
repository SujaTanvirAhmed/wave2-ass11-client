import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ children, ...rest }) {

    return (
        <Route
            {...rest}
            render={({ location }) =>
                localStorage.getItem("assignment11-logged") === "yes" ?
                    (children)
                    :
                    (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}