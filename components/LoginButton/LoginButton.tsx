import * as React from 'react';
import style from './LoginButton.module.scss';
const LoginButton = () => {
    const {
        button
    } = style;
    return (
        <button className={button}>
            <a href="#">Login</a>
        </button>
    )
}

export default LoginButton;