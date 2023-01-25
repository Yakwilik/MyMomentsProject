import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {authActions} from "../store/moments/moments.slice";

const actions = {
    ...authActions
}
export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}