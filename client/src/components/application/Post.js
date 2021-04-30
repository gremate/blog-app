import '../../styles/application/_post.scss';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function Post({ content, creationDate, id, title, onDeleteButtonClick }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="post" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            {hovered &&
                <div className="buttons-container">
                    <div className="buttons">
                        <FontAwesomeIcon className="button" icon={faEdit} />
                        <FontAwesomeIcon className="button delete" icon={faTrashAlt} onClick={() => onDeleteButtonClick(id)} />
                    </div>
                </div>
            }
            <div className="title">
                <div className="text">{title}</div>
                <div className="date">{new Date(creationDate).toLocaleDateString('en-GB')}</div>
            </div>
            <div className="content">{content}</div>
        </div>
    );
}

Post.propTypes = {
    content: PropTypes.string.isRequired,
    creationDate: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onDeleteButtonClick: PropTypes.func.isRequired
};

export default Post;
