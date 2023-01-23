import {IMoment} from "../../../models/models";
import {RegistrationInputFormValues} from "../../../store/moments/dataTypes/registration";
import React, {FC, useState} from "react";
import CSRFToken from "../CSRFToken";
import MyInput from "../../UI/input/MyInput";
import MyButton from "../../UI/button/MyButton";


interface RegistrationFormCallback {
    onSubmit: ((callback: RegistrationInputFormValues) => void)
}

const RegistrationForm: FC<RegistrationFormCallback> = ({onSubmit}) => {

    const [formData, setFormData] = useState<RegistrationInputFormValues>({
        login:{name: "login", value: ""},
        password: {name: "password", value: ""},
        email: {name: "email", value: ""},
        passwordRepeat: ""
    });
    function signUp(event: React.SyntheticEvent) {
        event.preventDefault()
        onSubmit(formData)
    };

    return (
        <div>
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
                <MyInput name={formData.password.name}
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
    )
};

export default RegistrationForm;