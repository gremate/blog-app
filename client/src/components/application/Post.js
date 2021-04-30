import '../../styles/application/_post.scss';
import React from 'react';
import PropTypes from 'prop-types';

function Post({ content, creationDate, id, title }) {
    return (
        <div className="post">
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
    title: PropTypes.string.isRequired
};

export default Post;
