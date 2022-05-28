import { Button, Divider, Paper, TextField, Typography } from '@material-ui/core';
import { useState } from 'react';
import FormField from './FormField'
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerValidation } from '../utils/schemas/registerValidation';
import { Alert } from '@material-ui/lab';
import { Api } from '../utils/api';
import { CreateUserDto } from '../utils/api/types';
import { useAppDispatch } from '../redux/hooks';
import { setUserData } from '../redux/slices/user';


const SettingsForm: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const form = useForm({
        mode: 'onSubmit',
    })
    const dispatch = useAppDispatch()


    const onSubmit = async (updateUserDto) => {
        try {
            const data = await Api().user.update(updateUserDto)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField name='fullName' label='Введите никнейм' />
                    <FormField name='password' label='Введите пароль' />
                    {errorMessage && <Alert className='mb-10' severity="error">{errorMessage}</Alert>}
                    <div className="d-flex align-center justify-between">
                        <Button disabled={form.formState.isSubmitting} type="submit" color="primary" variant="contained">
                            Сохранить изменения
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
export default SettingsForm
