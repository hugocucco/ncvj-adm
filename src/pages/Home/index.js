import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import api from '~/services/api';

import { updateProfileRequest } from '~/store/modules/user/actions';

import { Container } from './styles';

import estados from '~/pages/_layouts/default/estados';

const schema = Yup.object().shape({
  cpf: Yup.string()
    .min(11, 'O CPF precisa ter no mínimo 11 dígitos')
    .required('Digite um CPF válido'),
});

const options = [{ id: 'sim', title: 'Sim' }, { id: 'não', title: 'Não' }];

export default function Home() {
  const dispatch = useDispatch();

  const [result, setResult] = useState({
    name: '',
    cpf: '',
    uf_origem: '',
    pendencia: '',
    uf_pendencia: '',
  });

  const [input, setInput] = useState('');

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  async function consultar() {
    const response = await api.post('consultacpf', {
      cpf: input,
    });
    setResult(response.data);
  }
  return (
    <Container>
      <header>
        <strong>Consultar Pessoas e Alterar Pendência</strong>
      </header>
      <h3> Digite o CPF e depois clique em Consultar:</h3>
      <Form schema={schema} onSubmit={consultar}>
        <Input
          name="cpf"
          value={input}
          placeholder=" Digite o CPF"
          onInput={e => setInput(e.target.value)}
          autoComplete="off"
        />
        <button type="submit">Consultar</button>
        <hr />
      </Form>
      <h4> Resultado da Busca:</h4>
      <Form initialData={result} onSubmit={handleSubmit}>
        <h4>Nome:</h4>
        <Input name="name" disabled />

        <h4>CPF:</h4>
        <Input name="cpf" disabled />

        <h4>Estado de origem:</h4>
        <Input name="uf_origem" disabled />

        <h4>Pendência:</h4>
        <Select
          name="pendencia"
          value={result.pendencia}
          onChange={e => setResult({ ...result, pendencia: e.target.value })}
          options={options}
        />

        <h4>Estado da pendência:</h4>
        <Select
          name="uf_pendencia"
          value={result.uf_pendencia}
          onChange={e => setResult({ ...result, uf_pendencia: e.target.value })}
          options={estados}
        />

        <button type="submit">Alterar Pendência</button>
      </Form>
    </Container>
  );
}
