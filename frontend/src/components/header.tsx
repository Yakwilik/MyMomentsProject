import React, {FC, useState} from 'react';
import {Link} from "react-router-dom";
import {useAppSelector} from "../hooks/useAppSelector";
import {useActions} from "../hooks/useActions";
import {useLogoutMutation} from "../store/moments/momentsApi";

const Header: FC = () => {
    const isAuth = useAppSelector(state => state.auth)
    const {toggleAuth} = useActions()
    const [logoutMutation, {isLoading}] = useLogoutMutation()
    const logout = () => {
        logoutMutation(null)
        toggleAuth(false)
    }
    return (
        <header className={"h-12 w-screen justify-between flex items-center px-[15px] bg-[lightgray] mb-5"}>
            <Link to={"/"} className={"font-bold hover:text-[teal]"}>MyMoments</Link>
            <nav className={"ml-auto px-5"}>
                <Link to={"/about"} className={"mr-2 hover:text-[teal]"}>About</Link>
                {(!isAuth.authorized) ?
                    <span>
                        <Link className={"mx-2 hover:text-[teal] "} to={"/login"}>Войти</Link>
                        <Link className={"mx-2 hover:text-[teal] "} to={"/signup"}>Зарегистрироваться</Link>
                    </span> :
                    <span>
                        <Link className={"mx-2 hover:text-[teal] "} to={"/settings"}>Настройки</Link>
                        <Link className={"mx-2 hover:text-[teal] "} onClick={logout} to={"/login"}>Выйти</Link>
                    </span>}
            </nav>
        </header>
    );
}

export default Header;