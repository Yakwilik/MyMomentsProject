import React, {useState} from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";
import LoginForm from "../components/App/LoginForm/LoginForm";
import {AuthorizationInputFormValues, LoginData} from "../store/moments/dataTypes/registration";
import {useLazyGetCsrfQuery, useLoginMutation} from "../store/moments/momentsApi";
import {Loader} from "../components/UI/Loader/Loader";
import {useActions} from "../hooks/useActions";


const Login = () => {

    const [login, {isLoading, data, isSuccess}] = useLoginMutation()
    const [getCsrf, {isLoading: isLoadingCsrf, }] = useLazyGetCsrfQuery()
    const [{username, password}, setUsernamePassword] = useState({username: "", password: ""})
    function login_(values: AuthorizationInputFormValues, username: string, password: string) {
        const loginData = LoginData(values)
        getCsrf(null)
        login(loginData)
        console.log(loginData)
        setUsernamePassword({username: username, password: password})
        setAfterFetch(true)
    }
    const {toggleAuth} = useActions()
    const setAuth = () => {
        if (data?.status === 0) {
            console.log(data.message)
            toggleAuth(true)
            console.log("EEE")
            // Navigate({to:"", replace:true})
        }

    }
    if (!isLoading && isSuccess) {
        setAuth()
    }
    const [afterFetch, setAfterFetch] = useState(false)
    return (
        (isLoading || isLoadingCsrf) ?
            <Loader/>:

        <div className={"pt-5 w-[50%] text-center"}>
            <h1>Страница для логина</h1>
            <LoginForm username={username} password={password} onSubmit={login_}/>
            {(afterFetch && !isLoading && data?.status !== 0) ? <p className={"text-red-600"}>{data?.message}</p> :
                (afterFetch && !isLoading && data?.status === 0) ?
                    <Navigate to={"/"} replace={false}></Navigate> : <p></p>
            }
            <div className={"pt-4"}>
                Еще нет аккаунта? <Link to={"/signup"} className={"hover:text-[teal] font-bold text-[blue]"}>Зарегистрироваться</Link>
            </div>
        </div>
    );
};

export default Login;