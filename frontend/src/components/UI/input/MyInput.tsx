import React, {FC, LegacyRef} from 'react';
// import classes from './MyInput.module.css';

let classes = require("./MyInput.module.css");
const MyInput: FC = React.forwardRef((props, ref:LegacyRef<HTMLInputElement>) => {
    return (
        <input ref={ref} className={classes.myInput} {...props}/>
    );
});

export default MyInput;