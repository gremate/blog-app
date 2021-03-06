import '../../styles/common/_custom-button.scss';
import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

function CustomButton({ onClick, children }) {
    return (
        <Button classes={{ root: 'custom-button-root', label: 'custom-button-label', outlined: 'custom-button-outlined' }} variant="outlined" onClick={onClick}>
            {children}
        </Button>
    );
}

CustomButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

export default CustomButton;
