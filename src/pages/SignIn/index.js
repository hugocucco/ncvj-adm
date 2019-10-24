import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  username: Yup.string().required('Username obrigatório'),
  password: Yup.string().required('A Senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ username, password }) {
    dispatch(signInRequest(username, password));
  }
  return (
    <>
      <strong> Nada Consta Virtual Jurídico Admin</strong>
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <img src={logo} alt="Detetive" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input
          name="username"
          type="username"
          placeholder="Username"
          autoComplete="off"
        />
        <Input name="password" type="password" placeholder="Senha" />

        <button type="submit">{loading ? 'Carregando...' : 'Entrar'}</button>
      </Form>
    </>
  );
}
