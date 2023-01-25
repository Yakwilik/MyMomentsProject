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

export interface AuthorizationInputFormValues{
    username:InputField,
    password:InputField,
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

export function CsrfPayload() {
    let data = new FormData();
    data.append('csrfmiddlewaretoken', getCookie('csrftoken'))
    return data;
}

export function LoginData(values: AuthorizationInputFormValues) {
    let data = new FormData();
    data.append(values.username.name, values.username.value)
    data.append(values.password.name, values.password.value)
    data.append('csrfmiddlewaretoken', getCookie('csrftoken'))
    document.cookie.concat("csrftork", getCookie('csrftoken'))
    return data
}

export function RegistrationData(values: RegistrationInputFormValues) {
    let data = new FormData();
    data.append(values.login.name, values.login.value)
    data.append(values.password.name, values.password.value)
    data.append(values.email?.name!, values.email?.value!)
    // data.append(values.is_staff?.name!, values.is_staff?.value!)
    // data.append(values.is_superuser?.name!, values.is_superuser?.value!)
    data.append('csrfmiddlewaretoken', getCookie('csrftoken'))
    return data;
}
