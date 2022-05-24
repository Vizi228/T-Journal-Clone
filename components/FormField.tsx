import React from 'react'
import { TextField } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';
type FormFieldProps = {
    name: string,
    label: string,
    value?: string,
    onChange?: (arg1: string) => void,
}

const FormField: React.FC<FormFieldProps> = ({ name, label, value, onChange }) => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <TextField
            {...register(name)}
            className="mb-20"
            size="small"
            label={label}
            variant="outlined"
            name={name}
            type={name}
            error={!!errors[name]?.message}
            helperText={errors[name]?.message}
            fullWidth
        />
    )
}
export default FormField