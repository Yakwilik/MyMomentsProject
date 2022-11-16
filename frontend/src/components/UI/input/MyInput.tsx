import React, {FC, ForwardedRef, InputHTMLAttributes, LegacyRef} from 'react';
import classes from './MyInput.module.css';

type inpProps =  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export interface InputProps extends inpProps {
    name?: string,
    label?: string,

}


const MyInput = React.forwardRef<HTMLInputElement,InputProps>(({name,value, label, ...props}, ref: LegacyRef<HTMLInputElement> ) => {
    return (
        <div className={"w-[100%]"}>
            <label htmlFor={name}>{label}</label>
            <input ref={ref} value={value} id={name} {...props} className={classes.myInput}></input>
            <script>console.log({classes.myInput})</script>
        </div>
    );
});

export default MyInput;


