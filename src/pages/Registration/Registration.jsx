import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigate } from "react-router-dom";
import { server } from "../../bff";
import { Input, Button, H2, AuthFormError } from "../../components";
import styled from "styled-components";
import { setUser } from "../../store/actions";
import { selectUserRole } from "../../store/selectors";
import { ROLE } from "../../constants";
import { useResetForm } from "../../hooks";

const regFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Поле логин обязательное")
    .matches(
      /^\w+$/,
      "Неверно заполнен логин. Допускаются только буквы и цифры"
    )
    .min(3, "Необходимо минимум 3 символа")
    .max(15, "Необходимо максимум 15 символов"),
  password: yup
    .string()
    .required("Поле пароль обязательное")
    .matches(
      /^[\w#%]+$/,
      "Неверно заполнен пароль. Допускаются буквы, цифры, знаки # и %"
    )
    .min(6, "Необходимо минимум 6 символов"),
  passcheck: yup
    .string()
    .required("Поле пароль обязательное")
    .oneOf([yup.ref("password"), null], "Повтор пароля не совпадает"),
});

const RegistrationContainer = ({ className }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
      passcheck: "",
    },
    resolver: yupResolver(regFormSchema),
  });

  const [serverError, setServerError] = useState(null);

  const roleId = useSelector(selectUserRole);

  const dispatch = useDispatch();

  useResetForm(reset)

  const onSubmit = ({ login, password }) => {
    server.register(login, password).then(({ error, res }) => {
      if (error) {
        setServerError(`Ошибка запроса: ${error}`);
        return;
      }

      dispatch(setUser(res));
	  sessionStorage.setItem("userData", JSON.stringify(res));
    });
  };

  const formError = errors?.login?.messsge || errors?.password?.message || errors?.passcheck?.message;

  const errorMessage = formError || serverError;

  if (roleId !== ROLE.GUEST) {
    return <Navigate to="/" />;
  }

  return (
    <div className={className}>
      <H2>Регистрация</H2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Логин"
          {...register("login", { onChange: () => setServerError(null) })}
        />
        <Input
          type="password"
          placeholder="Пароль"
          {...register("password", { onChange: () => setServerError(null) })}
        />
        <Input
          type="password"
          placeholder="Проверка пароля"
          {...register("passcheck", { onChange: () => setServerError(null) })}
        />
        <Button type="submit" disabled={formError}>
          Зарегистрироваться
        </Button>
        {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
      </form>
    </div>
  );
};

export const Registration = styled(RegistrationContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > form {
    width: 260px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
