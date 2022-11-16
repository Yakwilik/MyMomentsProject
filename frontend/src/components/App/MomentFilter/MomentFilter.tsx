import React, {FC} from "react";
import MyInput from "../../UI/input/MyInput";
import MySelect, {OptionProps} from "../../UI/select/MySelect";

export interface MomentFilterProps {
    query: string,
    sort: string
}

interface MomentFilterState {
    filter: MomentFilterProps
    setFilter:  React.Dispatch<React.SetStateAction<MomentFilterProps>>
}
const MomentFilter :FC<MomentFilterState> = ({filter, setFilter, ...props}) =>{

    const options: OptionProps[] = [
        {name: "по тексту", value:"text"},
        {name: "по названию", value:"title"}
    ]

    return (<div>
        <MyInput
            value={filter.query}
            onChange={event => setFilter({...filter, query: event.target.value})}
            placeholder={"поиск..."}></MyInput>
        <MySelect value={filter.sort}
                  onChange={sort => setFilter({...filter, sort: sort.target.value})}
                  defaultValue={"сортировка по"}
                  options={options}
                  label={"Сортировка"}
        />
    </div>)
}

export default MomentFilter