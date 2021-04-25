import '../../styles/application/login.scss';
import React, { useState } from 'react';
import CustomButton from '../common/CustomButton';
import CustomTextField from '../common/CustomTextField';

export default function Login(props) {
    const [username, setUsername] = useState('');

    return (
        <div className="login">
            <div className="content-container">
                <div className="login-box">
                    <CustomTextField value={''} label="Username" onChange={null} />
                    <CustomTextField value={''} label="Password" onChange={null} />
                    <CustomButton onClick={null}>Login</CustomButton>
                </div>
            </div>
        </div>
    );
}
