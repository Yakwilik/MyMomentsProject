import React, {FC} from 'react';
import classes from "./MyModal.module.css"



interface MyModalProps {
    children: React.ReactNode
    visible: boolean
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const MyModal: FC<MyModalProps> = ({children, visible, setModal}) => {
    const rootClasses = [classes.myModal]

    if (visible) {
        rootClasses.push(classes.active);
    }
    return (
        <div className={rootClasses.join(' ')} onClick={() => setModal(false)}>
            <div className={classes.myModalContent} onClick={(e)=> e.stopPropagation()}>
                {children}
            </div>
        </div>)
}

export default MyModal;