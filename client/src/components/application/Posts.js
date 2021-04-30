import '../../styles/application/_posts.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../store/slice';
import Requests from '../../services/Requests';
import Post from './Post';
import CreatePost from './CreatePost';
import FakePost from './FakePost';

export default function Posts() {
    const [posts, setPosts] = useState(null);
    const dispatch = useDispatch();
    const jwtToken = useSelector(state => state.jwtToken);

    useEffect(() => {
        (async function () {
            const posts = (await Requests.getPosts(jwtToken, dispatch))?.posts;

            if (posts) {
                setPosts(posts);
            }

            dispatch(setLoading(false));
        })();
    }, [dispatch]);

    async function onCreatePostButtonClick(title, content) {
        dispatch(setLoading(true));

        const newPost = (await Requests.createPost(title, content, jwtToken, dispatch))?.post;

        if (newPost) {
            setPosts(prevPosts => [newPost, ...prevPosts]);
        }

        dispatch(setLoading(false));
    }

    return (
        <div className="posts">
            <div className="content-container">
                {posts
                    ? (
                        <>
                            <CreatePost onCreateButtonClick={onCreatePostButtonClick} />
                            {posts.map(x => <Post key={x.id} content={x.content} creationDate={x.creationDate} id={x.id} title={x.title} />)}
                        </>
                    )
                    : (
                        <>
                            <FakePost />
                            <FakePost />
                            <FakePost />
                        </>
                    )
                }
            </div>
        </div>
    );
}
