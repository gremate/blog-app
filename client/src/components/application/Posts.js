import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/slice';
import Requests from '../../services/Requests';

export default function Posts() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(false));
    }, [dispatch]);

    return (
        <div>
            posts
        </div>
    );
}
