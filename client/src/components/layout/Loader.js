import '../../styles/layout/loader.scss';
import React from 'react';
import { useSelector } from 'react-redux';

export default function Loader() {
    const loading = useSelector(state => state.loading);

    return (
        loading &&
        <div className="loader-container">
            <div className="loader" />
        </div>
    );
}
