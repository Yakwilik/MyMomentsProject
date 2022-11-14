import React from 'react';
import {useSignUpQuery} from "../store/moments/momentsApi";
import {Link} from "react-router-dom";
import CSRFToken from "../components/CSRFToken";
const inputStyles: string = "w-full py-[5px] px-[15px] my-[5px] border outline-[teal]"
const buttonStyle: string = "py-[5px] my-4 px-[15px] cursor-pointer bg-[teal] hover:bg-[lightgray] m-auto"


const Login = () => {

    return (
        <div className={"pt-5 w-[50%] text-center"}>
            <h1>Страница для логина</h1>
            <form className={"flex flex-col"}>
                <CSRFToken></CSRFToken>
                <input type="text" placeholder={"Введите логин"} className={inputStyles}/>
                <input type={"password"} placeholder={"Введите пароль"} className={inputStyles}/>
                <button className={buttonStyle}>Войти</button>
            </form>
            <div className={"pt-4"}>
                Еще нет аккаунта? <Link to={"/"} className={"hover:text-[teal]"}>Зарегистрироваться</Link>
            </div>
        </div>
    );
};

export default Login;