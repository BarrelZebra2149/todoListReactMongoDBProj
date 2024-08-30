import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import store from "./store/store";
import {Provider, useDispatch} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {checkAuthStatus} from "./store/authActions";
import "./style/home.css"

const root = ReactDOM.createRoot(document.getElementById('root'));

const AuthChecker = ({children}) => {
    const dispatch = useDispatch();
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            await dispatch(checkAuthStatus());
            setIsAuthChecked(true); // Update state once the auth check is done
        };

        checkAuth().then(r=>console.log('okay'));
    }, [dispatch]);

    if (!isAuthChecked) {
        return <div className="container"><h1>Loading...</h1></div>; // Or you can return null or a custom loading spinner
    }

    return children;
};

root.render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
                <AuthChecker>
                    <App />
                </AuthChecker>
            </Provider>
        </React.StrictMode>
    </BrowserRouter>
);
