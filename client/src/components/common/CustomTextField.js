import '../../styles/common/_custom-text-field.scss';
import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

function CustomTextField({ label, value, onChange, fullWidth, multiline, rows, type }) {
    return <TextField classes={{ root: 'custom-text-field-root' }} fullWidth={fullWidth} label={label} InputLabelProps={{ classes: { root: 'custom-text-field-label-root' } }}
        InputProps={{ classes: { root: 'custom-text-field-input-root', notchedOutline: 'custom-text-field-input-notched-outline' } }} multiline={multiline} rows={rows} type={type || 'text'} value={value}
        variant="outlined" onChange={onChange} />;
}

CustomTextField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    fullWidth: PropTypes.bool,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
    type: PropTypes.string
};

export default CustomTextField;
