import React from 'react';
import {useSignUpQuery} from "../store/moments/momentsApi";
import {Link} from "react-router-dom";
import CSRFToken from "../components/CSRFToken";
const inputStyles: string = "w-full py-[5px] px-[15px] my-[5px] border outline-[teal]"
const buttonStyle: string = "py-[5px] my-4 px-[15px] cursor-pointer bg-[teal] hover:bg-[lightgray] m-auto"


const Registration = () => {
    const {isLoading, isError, data} = useSignUpQuery('qwerty12345qwe');
    return (
        <div className={"pt-5 w-[50%] text-center"}>
            {isError && <h2>ошибка</h2>}
            <h1>Страница для логина</h1>
            <form className={"flex flex-col"}>
                <CSRFToken></CSRFToken>
                <input type="email" placeholder={"Введите почту"} className={inputStyles}/>
                <input type="text" placeholder={"Введите логин"} className={inputStyles}/>
                <input type={"password"} placeholder={"Введите пароль"} className={inputStyles}/>
                <input type={"password"} placeholder={"Повторите пароль"} className={inputStyles}/>
                <button className={buttonStyle}>Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default Registration;