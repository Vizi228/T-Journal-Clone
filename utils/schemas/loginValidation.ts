import * as yup from "yup";

export const loginValidation = yup.object().shape({
    email: yup.string().email('Неверная почта').required('Это обязательно поле'),
    password: yup.string().min(6, 'Пароль должен быть не менее 6 символов').required('Это обязательное поле'),
});
