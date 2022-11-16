import React, {FC, useRef, useState} from 'react';
import MyInput from "../../UI/input/MyInput";
import MyButton from "../../UI/button/MyButton";
import Moment, {IMoment} from "../Moment/Moment";

interface NewMomentFormCallback {
    onSubmit: ((callback: IMoment) => void)
}

const NewMomentForm: FC<NewMomentFormCallback> = ({onSubmit}) => {
    const [moment, setMoment] = useState<IMoment>({id:2, title: "", image: " ", text: "", comments:[]})
    const bodyInputRef = useRef<HTMLInputElement>(null)
    const addNewMoment = (event: React.SyntheticEvent) => {
        event.preventDefault()
        setMoment({id: moment.id + 1, text: " ", image: " ", title: " ", comments:[]})
        const newMoment: IMoment = moment
        onSubmit(newMoment)
    }
        return (
            <div className={"min-w-[300px]"}>
                <div className={"text-center font-bold"}>Создать новый момент</div>
                <MyInput type={"text"}
                         value={moment.title}
                         onChange={event => setMoment({...moment, title: event.target.value})}
                         ref={bodyInputRef}
                         placeholder={"название"}
                />
                <MyInput type={"textarea"}
                         value={moment.text}
                         onChange={event => setMoment({...moment, text: event.target.value})}
                         placeholder={"текст"}
                />
                <MyButton onClick={addNewMoment}>подтвердить</MyButton>
            </div>
        );
};

export default NewMomentForm;