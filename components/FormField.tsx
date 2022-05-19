import React from 'react'
import { TextField } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';
type FormFieldProps = {
    name: string,
    label: string,
}

const FormField: React.FC<FormFieldProps> = ({ name, label }) => {
    const { register, formState: { errors } } = useFormContext();
    console.log(errors)
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