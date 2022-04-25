import { RegisterForm } from "../../Components/Auth/RegisterForm";
import { Header } from "../../Components/Navigation/Header";
import { ToastProvider } from "react-toast-notifications";
import { LoginForm } from "./../../Components/Auth/LoginForm";
import { ErrorNotification } from "../../Components/Shared/ToastNotification";
import "../../css/auth/auth.css"


export const AuthPage = () => {
    const isLogin = () => {
        return window.location.pathname === "/login" ? true : false;
    };

    const getComponent = () => {
        if (isLogin()) {
            return <LoginForm />;
        } else {
            return <RegisterForm />;
        }
    }

    return (
        <div className="auth-background">
            <Header></Header>
            <ToastProvider components={{ Toast: ErrorNotification }}>
                {
                    getComponent()
                }
            </ToastProvider>
        </div>
    );
};
