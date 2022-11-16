import {data} from "autoprefixer";
import {Form} from "react-router-dom";
import getCookie from "../../../cookie/cookie";

interface InputField {
    name: string,
    value: string
};

export interface RegistrationInputFormValues{
    login:InputField,
    password:InputField,
    email?: InputField,
    is_staff?: InputField,
    is_superuser?: InputField,
    passwordRepeat:string
}


// export const RegistrationData = (values: RegistrationInputFormValues) => {
//     const data = new FormData;
//     // data.append()
//     return data;
// }

type MyFormFields = "image" & "username";

export interface MyFormData extends FormData {
    append(name: MyFormFields, value: string | Blob, fileName?: string): void
}

export function RegistrationData(values: RegistrationInputFormValues) {
    var data = new FormData;
    data.append(values.login.name, values.login.value)
    data.append(values.password.name, values.password.value)
    data.append(values.email?.name!, values.email?.value!)
    data.append(values.is_staff?.name!, values.is_staff?.value!)
    data.append(values.is_superuser?.name!, values.is_superuser?.value!)
    data.append('csrfmiddlewaretoken', getCookie('csrftoken'))
    return data;
}
