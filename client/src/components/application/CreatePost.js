import '../../styles/application/_post.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomButton from '../common/CustomButton';
import CustomTextField from '../common/CustomTextField';

function CreatePost({ onSubmitButtonClick, creationDate, edit, id, initialContent, initialTitle, onCancelButtonClick }) {
    const [title, setTitle] = useState(initialTitle || '');
    const [content, setContent] = useState(initialContent || '');

    async function onButtonClick() {
        if (!title || !content) {
            return;
        }

        if (edit) {
            await onSubmitButtonClick(id, title, content);

            return;
        }

        await onSubmitButtonClick(title, content);

        setTitle('');
        setContent('');
    }

    return (
        <div className="post create-post">
            <div className="title">
                <CustomTextField label="Title" value={title} onChange={event => setTitle(event.target.value)} fullWidth />
                <div className="date">{(edit ? new Date(creationDate) : new Date()).toLocaleDateString('en-GB')}</div>
            </div>
            <div className="content">
                <CustomTextField label="Content" value={content} onChange={event => setContent(event.target.value)} fullWidth multiline rows={5} />
            </div>
            {edit
                ? (
                    <div className="buttons">
                        <CustomButton onClick={onButtonClick}>Save</CustomButton>
                        <CustomButton onClick={onCancelButtonClick}>Cancel</CustomButton>
                    </div>
                )
                : <CustomButton onClick={onButtonClick}>Create</CustomButton>
            }
        </div>
    );
}

CreatePost.propTypes = {
    onSubmitButtonClick: PropTypes.func.isRequired,
    creationDate: PropTypes.string,
    edit: PropTypes.bool,
    id: PropTypes.number,
    initialContent: PropTypes.string,
    initialTitle: PropTypes.string,
    onCancelButtonClick: PropTypes.func
};

export default CreatePost;
