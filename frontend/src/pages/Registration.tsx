import React, {useState} from 'react';
import {RegistrationData, RegistrationInputFormValues} from "../store/moments/dataTypes/registration"
import axios from "axios";
import RegistrationForm from "../components/App/RegistrationForm/RegistrationForm";

// const buttonStyle: string = "py-[5px] my-4 px-[15px] cursor-pointer bg-[teal] hover:bg-[lightgray] m-auto"


const Registration = () => {
    // const registrationData: RegistrationData = {set(name: string, value: string | Blob, fileName?: string) {
    //     }}
    // const {isLoading, isError, data} = useSignUpQuery(registrationData);



    const [visible, setVisible] = useState<string>('None')
    function signUp(values: RegistrationInputFormValues) {
        const data = RegistrationData(values)
        console.log(data)
        async function fetchResult() {
            const response = await axios.post("http://localhost:8080/api/v1/signup/", data).catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })

        }
        fetchResult().then()
    }

    return (
        <div className={"pt-5 w-[50%] text-center"}>
            {/*{isError && <h2>ошибка</h2>}*/}
            <h1>Страница для регистрации</h1>
            <RegistrationForm onSubmit={signUp}/>
        </div>
    );

};

export default Registration;