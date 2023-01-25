import React, {FC, useRef, useState} from 'react';
import MyInput from "../../UI/input/MyInput";
import MyButton from "../../UI/button/MyButton";
import {IMoment} from "../../../models/models";
import {FILE} from "dns";
import {useAddMomentMutation} from "../../../store/moments/momentsApi";
import {Form} from "react-router-dom";
import getCookie from "../../../cookie/cookie";

interface NewMomentFormCallback {
    onSubmit: ((callback: IMoment) => void)
}

const NewMomentForm: FC<NewMomentFormCallback> = ({onSubmit}) => {
    const [moment, setMoment] = useState<IMoment>({id:2, is_liked: false, title: "", image: " ", content: "", comments:[], author:{id:1, avatar: ""}})
    const bodyInputRef = useRef<HTMLInputElement>(null)
    const addNewMoment = (event: React.SyntheticEvent) => {
        event.preventDefault()
        let form = new FormData();
        form.append('image', file as Blob)
        form.append('content', moment.content)
        form.append('title', moment.title)
        form.append('csrfmiddlewaretoken', getCookie('csrftoken'))
        addMoment(form)
    }
    const [addMoment, {isLoading}] = useAddMomentMutation()
    const [file, setFile] = useState<File>()
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files)
            setFile(e.target.files[0])

    }
        return (
            <div className={"min-w-[300px]"}>
                <div className={"text-center font-bold"}>Создать новый момент</div>
                <form onSubmit={addNewMoment}>
                    <MyInput type="file" multiple accept="image/*" onChange={onFileChange}/>
                    <MyInput type={"text"}
                             value={moment.title}
                             onChange={event => setMoment({...moment, title: event.target.value})}
                             ref={bodyInputRef}
                             placeholder={"название"}
                    />
                    <MyInput type={"textarea"}
                             value={moment.content}
                             onChange={event => setMoment({...moment, content: event.target.value})}
                             placeholder={"текст"}
                    />
                    <MyButton>подтвердить</MyButton>
                </form>
            </div>
        );
};

export default NewMomentForm;