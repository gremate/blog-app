import '../../styles/common/custom-text-field.scss';
import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

function CustomTextField({ label, value, onChange, type }) {
    return <TextField classes={{ root: 'custom-text-field-root' }} label={label} InputLabelProps={{ classes: { root: 'custom-text-field-label-root' } }}
        InputProps={{ classes: { root: 'custom-text-field-input-root', notchedOutline: 'custom-text-field-input-notched-outline' } }} type={type || 'text'} value={value}
        variant="outlined" onChange={onChange} />;
}

CustomTextField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string
};

export default CustomTextField;
