import React, { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import styles from '../AuthDialogs.module.scss';
import nookies, { setCookie } from 'nookies'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { FormProvider, useForm } from 'react-hook-form';
import { registerValidation } from '../../../utils/schemas/registerValidation'
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from '../../FormField';
import { CreateUserDto } from '../../../utils/api/types';
import { UserApi } from '../../../utils/api/index';
import { Alert } from '@material-ui/lab';
import { useAppDispatch } from '../../../redux/hooks';
import { setUserData } from '../../../redux/slices/user';


interface RegisterFormProps {
    onOpenMain: () => void,
    onOpenLogin: () => void,
    onClose: () => void;
}


const RegisterForm: React.FC<RegisterFormProps> = ({ onOpenMain, onOpenLogin, onClose }) => {
    const [errorMessage, setErrorMessage] = useState('')
    const form = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(registerValidation)
    })
    const dispatch = useAppDispatch()
    const onSubmit = async (dto: CreateUserDto) => {
        try {
            const data = await UserApi.register(dto);
            setCookie(null, 'authToken', data.token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/'
            })
            setErrorMessage('');
            dispatch(setUserData(data))
            onClose()
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message)
            }
        }
    }
    return (
        <div>
            <FormProvider {...form}>
                <Typography className={styles.title}>
                    <p onClick={onOpenMain} className={styles.backTitle}>
                        <ArrowBackIcon /> К авторизации
                    </p>
                </Typography>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField name='fullName' label='Введите имя и фамилия' />
                    <FormField name='email' label='Введите почту' />
                    <FormField name='password' label='Введите пароль' />
                    {errorMessage && <Alert className='mb-10' severity="error">{errorMessage}</Alert>}
                    <div className="d-flex align-center justify-between">
                        <Button disabled={form.formState.isSubmitting} type='submit' color="primary" variant="contained">
                            Зарегистрироваться
                        </Button>
                        <Button type='submit' onClick={onOpenLogin} color="primary" variant="text">
                            Войти
                        </Button>
                    </div>
                </form>
            </FormProvider>

        </div>
    )
}
export default RegisterForm