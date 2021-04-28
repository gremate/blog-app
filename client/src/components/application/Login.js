import '../../styles/application/login.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setLoading, setJwtToken } from '../../store/slice';
import Requests from '../../services/Requests';
import { letterDigitPattern } from '../../constants/patterns';
import CustomButton from '../common/CustomButton';
import CustomTextField from '../common/CustomTextField';

export default function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const jwtToken = useSelector(state => state.jwtToken);

    function onInputChange(event, setValue) {
        const { value } = event.target;

        if (letterDigitPattern.test(value)) {
            setValue(value);
        }
    }

    async function onButtonClick() {
        if (!username || !password) {
            setErrorMessage('Missing credentials');

            return;
        }

        try {
            dispatch(setLoading(true));

            const data = await Requests.login(username, password);

            dispatch(setJwtToken(data.jwtToken));
        } catch (error) {
            switch (error.status) {
                case 400:
                    setErrorMessage('Username or password is incorrect');
                    break;
                case 500:
                    setErrorMessage('Error occurred at server');
                    break;
                default:
                    break;
            }

            dispatch(setLoading(false));
        }
    }

    return (
        <>
            {jwtToken && <Redirect to="/posts" />}
            <div className="login">
                <div className="content-container">
                    <div className="login-box">
                        <CustomTextField label="Username" value={username} onChange={event => onInputChange(event, setUsername)} />
                        <CustomTextField label="Password" value={password} onChange={event => onInputChange(event, setPassword)} type="password" />
                        {errorMessage &&
                            <div className="error-message">{errorMessage}</div>
                        }
                        <CustomButton onClick={onButtonClick}>Login</CustomButton>
                    </div>
                </div>
            </div>
        </>
    );
}
