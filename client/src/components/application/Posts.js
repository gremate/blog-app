import '../../styles/application/_posts.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../store/slice';
import Requests from '../../services/Requests';

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const jwtToken = useSelector(state => state.jwtToken);

    useEffect(() => {
        (async function () {
            const posts = await Requests.getPosts(jwtToken, dispatch);

            if (posts) {
                setPosts(posts);
            }

            dispatch(setLoading(false));
        })();
    }, [dispatch]);

    return (
        <div className="posts">
            <div className="content-container">
                <div className="title">
                    Posts
                </div>
            </div>
        </div>
    );
}
