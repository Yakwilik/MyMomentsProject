import {AuthorizationInputFormValues} from "../../../store/moments/dataTypes/registration";
import React, {FC, useState} from "react";
import CSRFToken from "../CSRFToken";
import MyInput from "../../UI/input/MyInput";
import MyButton from "../../UI/button/MyButton";


interface AuthorizationFormCallback {
    onSubmit: ((callback: AuthorizationInputFormValues, username: string, password: string) => void)
    username: string;
    password: string;
}

const LoginForm: FC<AuthorizationFormCallback> = ({onSubmit}) => {

    const [formData, setFormData] = useState<AuthorizationInputFormValues>({
        username:{name: "username", value: ""},
        password: {name: "password", value: ""},
    });
    function login(event: React.SyntheticEvent) {
        event.preventDefault()
        onSubmit(formData, formData.username.value, formData.password.value)
    };

    return (
        <div>
            <form className={"flex flex-col"} onSubmit={login} >
                <CSRFToken></CSRFToken>

                <MyInput name={formData.username.name}
                         value={formData.username.value}
                         required={true}
                         type={"text"}
                         placeholder={"Введите логин"}
                         onChange={event => {setFormData({...formData, username: {name: formData.username.name, value: event.target.value}})}}
                />
                <MyInput name={formData.password.name}
                         type={"password"}
                         required={true}
                         placeholder={"Введите пароль"}
                         value={formData.password.value}
                         onChange={event => {setFormData({...formData, password: {value: event.target.value, name: formData.password.name}})}}
                />
                <MyButton>Войти</MyButton>
            </form>
        </div>
    )
};

export default LoginForm;