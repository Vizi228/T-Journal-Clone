import React from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import styles from '../AuthDialogs.module.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { FormProvider, useForm } from 'react-hook-form';
import { registerValidation } from '../../../utils/schemas/registerValidation'
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from '../../FormField';

interface RegisterFormProps {
    onOpenMain: () => void,
    onOpenLogin: () => void,
}


const RegisterForm: React.FC<RegisterFormProps> = ({ onOpenMain, onOpenLogin }) => {
    const form = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(registerValidation)
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
                    <FormField name='fullname' label='Введите имя и фамилия' />
                    <FormField name='email' label='Введите почту' />
                    <FormField name='password' label='Введите пароль' />
                    <div className="d-flex align-center justify-between">
                        <Button type='submit' color="primary" variant="contained">
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