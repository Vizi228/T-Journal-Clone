import * as yup from "yup";

export const registerValidation = yup.object().shape({
    email: yup.string().email('Неверная почта').required('Это обязательно поле'),
    password: yup.string().min(6, 'Пароль должен быть не менее 6 символов').required('Это обязательное поле'),
    fullname: yup.string().min(4, 'Имя должно быть не менее 4 символов').required('Это обязательное поле')
});