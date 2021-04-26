import '../../styles/application/login.scss';
import React, { useState } from 'react';
import Requests from '../../services/Requests';
import { letterDigitPattern } from '../../constants/patterns';
import CustomButton from '../common/CustomButton';
import CustomTextField from '../common/CustomTextField';

export default function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function onInputChange(event, setValue) {
        const { value } = event.target;

        if (letterDigitPattern.test(value)) {
            setValue(value);
        }
    }

    async function onButtonClick() {
        if (username && password) {
            try {
                const data = await Requests.login(username, password);
            } catch (error) {
            }
        }
    }

    return (
        <div className="login">
            <div className="content-container">
                <div className="login-box">
                    <CustomTextField label="Username" value={username} onChange={event => onInputChange(event, setUsername)} />
                    <CustomTextField label="Password" value={password} onChange={event => onInputChange(event, setPassword)} type="password" />
                    <CustomButton onClick={onButtonClick}>Login</CustomButton>
                </div>
            </div>
        </div>
    );
}
