import React, {ButtonHTMLAttributes, FC} from "react";
import classes from "./MyButton.module.css"

const MyButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({children, ...props}) => {
    return (
        <button {...props} className={classes.ButtonStyles}>
            {children}
        </button>
    );
};

export default MyButton