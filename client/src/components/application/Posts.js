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
    const [editablePostId, setEditablePostId] = useState(null);
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

    async function onDeletePostButtonClick(postId) {
        dispatch(setLoading(true));

        try {
            await Requests.deletePost(postId, jwtToken, dispatch);
        } catch (error) { }

        setPosts(prevPosts => prevPosts.filter(x => x.id !== postId));

        dispatch(setLoading(false));
    }

    async function onSavePostButtonClick(postId, title, content) {
        dispatch(setLoading(true));

        const updatedPost = (await Requests.updatePost(postId, title, content, jwtToken, dispatch))?.post;

        if (updatedPost) {
            setPosts(prevPosts => prevPosts.map(x => x.id === updatedPost.id ? updatedPost : x));
            setEditablePostId(null);
        }

        dispatch(setLoading(false));
    }

    return (
        <div className="posts">
            <div className="content-container">
                {posts
                    ? (
                        <>
                            <CreatePost onSubmitButtonClick={onCreatePostButtonClick} />
                            {posts.map(x => x.id === editablePostId
                                ? <CreatePost key={x.id} onSubmitButtonClick={onSavePostButtonClick} creationDate={x.creationDate} edit id={x.id} initialContent={x.content}
                                    initialTitle={x.title} onCancelButtonClick={() => setEditablePostId(null)} />
                                : <Post key={x.id} content={x.content} creationDate={x.creationDate} id={x.id} title={x.title} onDeleteButtonClick={onDeletePostButtonClick}
                                    onEditButtonClick={postId => setEditablePostId(postId)} />
                            )}
                        </>
                    )
                    : (
                        <>
                            <FakePost />
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
