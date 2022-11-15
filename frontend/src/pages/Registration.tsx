import React, {useState} from 'react';
import {useSignUpQuery} from "../store/moments/momentsApi";
import CSRFToken from "../components/App/CSRFToken";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";

const buttonStyle: string = "py-[5px] my-4 px-[15px] cursor-pointer bg-[teal] hover:bg-[lightgray] m-auto"


const Registration = () => {
    const {isLoading, isError, data} = useSignUpQuery('qwerty12345qwe');
    const [value, setValue] = useState('value')



    return (
        <div className={"pt-5 w-[50%] text-center"}>
            {isError && <h2>ошибка</h2>}
            <h1>Страница для логина</h1>
            <form className={"flex flex-col"}>
                <CSRFToken></CSRFToken>
                <MyInput name={"email"} type={"email"} placeholder={"Введите почту"}/>
                <MyInput name={"text"} type={"text"} placeholder={"Введите логин"}/>
                <MyInput name={"password"} type={"password"} placeholder={"Введите пароль"}/>
                <MyInput name={"password-repeat"} type={"password"} placeholder={"Повторите пароль"}
                         onChange={event => setValue(event.target.value)}
                         value={value}
                />
                <MyButton>Зарегистрироваться</MyButton>
            </form>
            <div>{value}</div>
        </div>
    );

};

export default Registration;