import React, {FC} from 'react';

type selectProps =  React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

export interface OptionProps {
    name: string,
    value: string
}

interface MySelectProps extends selectProps{
    defaultValue: string
    options: OptionProps[],
    name?: string,
    label?: string,
}



const MySelect :FC<MySelectProps> = ({defaultValue, options,value,onChange, name,label, ...props}) => {
    return (
        <div className={"p-3 m-3"}>
            <label htmlFor={name} className={"pr-3"}>{label}</label>
            <select value={value} onChange={event => onChange!(event)} {...props}>
                <option disabled={true} value={""}>{defaultValue}</option>
                {options.map(option =>
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>)}
            </select>
        </div>
    );
};

MySelect.propTypes = {

};

export default MySelect;