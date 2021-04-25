import '../../styles/common/custom-text-field.scss';
import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

function CustomTextField({ value, label, onChange }) {
    return <TextField value={value} label={label} variant="outlined" classes={{ root: 'custom-text-field-root' }}
        InputLabelProps={{ classes: { root: 'custom-text-field-label-root' } }}
        InputProps={{ classes: { root: 'custom-text-field-input-root', notchedOutline: 'custom-text-field-input-notched-outline' } }} onChange={onChange} />;
}

CustomTextField.propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default CustomTextField;
