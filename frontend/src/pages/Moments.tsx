import React, {useRef, useState} from "react";
import Moment from "../components/App/Moment/Moment";
import {IMoment} from "../components/App/Moment/Moment";
import MomentList from "../components/App/MomentList/MomentList";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";

// interface Moments
const Moments = () => {
    const moments: IMoment[] = [
        {title:"firstPost", text:"This is my first post", id:0, image:""},
        {title:"secondPost", text:"This is my second post", id:1, image:""}
    ]

    const [title, setTitle] = useState(" ")
    const bodyInputRef = useRef<HTMLInputElement>(null)
    const addNewMoment = (event: React.SyntheticEvent) => {
        event.preventDefault()
        console.log(bodyInputRef)
    }
    return (
        <div>
            <MyInput type={"text"}
                     label={"Cоздать новый момент"}
                     onChange={event => setTitle(event.target.value)}
                        ref={bodyInputRef}
            />
            <MyButton onClick={addNewMoment}>log</MyButton>
            <MomentList moments={moments}></MomentList>
        </div>
    );
};

export default Moments;