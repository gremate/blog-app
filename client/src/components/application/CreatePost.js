import '../../styles/application/_post.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomButton from '../common/CustomButton';
import CustomTextField from '../common/CustomTextField';

function CreatePost({ onCreateButtonClick }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    async function onButtonClick() {
        if (!title || !content) {
            return;
        }

        await onCreateButtonClick(title, content);

        setTitle('');
        setContent('');
    }

    return (
        <div className="post create-post">
            <div className="title">
                <CustomTextField label="Title" value={title} onChange={event => setTitle(event.target.value)} fullWidth />
                <div className="date">{new Date().toLocaleDateString('en-GB')}</div>
            </div>
            <div className="content">
                <CustomTextField label="Content" value={content} onChange={event => setContent(event.target.value)} fullWidth multiline rows={5} />
            </div>
            <CustomButton onClick={onButtonClick}>Create</CustomButton>
        </div>
    );
}

CreatePost.propTypes = {
    onCreateButtonClick: PropTypes.func.isRequired
};

export default CreatePost;
