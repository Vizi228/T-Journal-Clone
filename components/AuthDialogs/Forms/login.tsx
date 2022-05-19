import React from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import styles from '../AuthDialogs.module.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { loginValidation } from '../../../utils/schemas/loginValidation'
import FormField from '../../FormField';

interface LoginFormProps {
    onOpenMain: () => void,
    onOpenRegister: () => void
}


const LoginForm: React.FC<LoginFormProps> = ({ onOpenMain, onOpenRegister }) => {
    const form = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(loginValidation)
    })
    const onSubmit = data => console.log(data);
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
                    <div className="d-flex align-center justify-between">
                        <Button type="submit" color="primary" variant="contained">
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