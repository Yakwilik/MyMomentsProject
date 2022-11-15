import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <header className={"h-12 w-screen justify-between flex items-center px-[15px] bg-[lightgray] mb-5"}>
                <Link to={"/"} className={"font-bold hover:text-[teal]"}>MyMoments</Link>
                <nav className={"ml-auto px-5"}>
                    <Link to={"/about"} className={"mr-2 hover:text-[teal]"}>About</Link>
                    <Link className={"mx-2 hover:text-[teal] "} to={"/login"}>Войти</Link>
                    <Link className={"mx-2 hover:text-[teal] "} to={"/signup"}>Зарегистрироваться</Link>
                </nav>
            </header>
        );
    }
}

export default Header;