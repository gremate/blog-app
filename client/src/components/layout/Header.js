import '../../styles/layout/_header.scss';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt from 'jsonwebtoken';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { setJwtToken } from '../../store/slice';

export default function Header() {
    const dispatch = useDispatch();
    const jwtToken = useSelector(state => state.jwtToken);

    return (
        <header>
            <div className="content-container">
                <div className="title">Blog App</div>
                {jwtToken &&
                    <div className="logout" onClick={() => dispatch(setJwtToken(null))}>
                        {jwt.decode(jwtToken).username}
                        <FontAwesomeIcon className="icon" icon={faSignOutAlt} />
                    </div>
                }
            </div>
        </header>
    );
}
