import React, { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import styles from '../AuthDialogs.module.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@material-ui/lab';
import { FormProvider, useForm } from 'react-hook-form';
import { loginValidation } from '../../../utils/schemas/loginValidation'
import FormField from '../../FormField';
import { setCookie } from 'nookies';
import { UserApi } from '../../../utils/api/user';
import { LoginDto } from '../../../utils/api/types';
import { useAppDispatch } from '../../../redux/hooks';
import { setUserData } from '../../../redux/slices/user';
import { Api } from '../../../utils/api';

interface LoginFormProps {
    onOpenMain: () => void,
    onOpenRegister: () => void,
    onClose: () => void;
}


const LoginForm: React.FC<LoginFormProps> = ({ onOpenMain, onOpenRegister, onClose }) => {
    const [errorMessage, setErrorMessage] = useState('')
    const dispatch = useAppDispatch()
    const form = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(loginValidation)
    })

    const onSubmit = async (dto: LoginDto) => {
        try {
            const data = await Api().user.login(dto);
            setCookie(null, 'authToken', data.token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/'
            });
            setErrorMessage('')
            dispatch(setUserData(data))
            onClose();
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
                    <FormField name='email' label='Введите почту' />
                    <FormField name='password' label='Введите пароль' />
                    {errorMessage && <Alert className='mb-10' severity="error">{errorMessage}</Alert>}
                    <div className="d-flex align-center justify-between">
                        <Button disabled={form.formState.isSubmitting} type="submit" color="primary" variant="contained">
                            Войти
                        </Button>
                        <Button type="submit" onClick={onOpenRegister} color="primary" variant="text" className='ml-10'>
                            Регистрация
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
export default LoginForm