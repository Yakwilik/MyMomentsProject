import React, {useState} from 'react';
// import {useSignUpQuery} from "../store/moments/momentsApi";
import CSRFToken from "../components/App/CSRFToken";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {RegistrationData, RegistrationInputFormValues} from "../store/moments/dataTypes/registration"
import {useSignUpMutation} from "../store/moments/momentsApi";
import axios from "axios";

const buttonStyle: string = "py-[5px] my-4 px-[15px] cursor-pointer bg-[teal] hover:bg-[lightgray] m-auto"


const Registration = () => {
    // const registrationData: RegistrationData = {set(name: string, value: string | Blob, fileName?: string) {
    //     }}
    // const {isLoading, isError, data} = useSignUpQuery(registrationData);

    const [formData, setFormData] = useState<RegistrationInputFormValues>({
        login:{name: "login", value: "login"},
        password: {name: "password", value: "pass"},
        email: {name: "email", value: "khas@mail.ru"},
        passwordRepeat: ""
    })


    function signUp(event:  React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const data = RegistrationData(formData)
        async function fetchResult() {
            const response = await axios.post("http://localhost:8080/api/v1/signup/", data)
            console.log(response.data)
        }
        fetchResult().then()
    }

    return (
        <div className={"pt-5 w-[50%] text-center"}>
            {/*{isError && <h2>ошибка</h2>}*/}
            <h1>Страница для логина</h1>
            <form className={"flex flex-col"} onSubmit={signUp} >
                <CSRFToken></CSRFToken>
                <MyInput name={"email"}
                         type={"email"}
                         value={formData.email?.value!}
                         onChange={event => {setFormData({...formData, email: {name:formData.email?.name!, value: event.target.value}})}}
                         placeholder={"Введите почту"}/>
                <MyInput name={formData.login.name}
                         value={formData.login.value}
                         type={"text"}
                         placeholder={"Введите логин"}
                         onChange={event => {setFormData({...formData, login: {name: formData.login.name, value: event.target.value}})}}
                />
                <MyInput name={"password"}
                         type={"password"}
                         placeholder={"Введите пароль"}
                         value={formData.password.value}
                         onChange={event => {setFormData({...formData, password: {value: event.target.value, name: formData.password.name}})}}
                />
                <MyInput name={"password-repeat"}
                         type={"password"}
                         placeholder={"Повторите пароль"}
                         onChange={event => setFormData({...formData, passwordRepeat:event.target.value})}
                         value={formData.passwordRepeat}
                />
                <MyButton>Зарегистрироваться</MyButton>
            </form>
        </div>
    );

};

export default Registration;