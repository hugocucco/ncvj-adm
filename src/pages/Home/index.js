import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Select } from '@rocketseat/unform';
import LoadingOverlay from 'react-loading-overlay';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { isCPF } from 'brazilian-values';
import { cpfMask } from '../_layouts/default/mask';
import api from '~/services/api';

import { updateProfileRequest } from '~/store/modules/user/actions';

import { Container } from './styles';

import estados from '~/pages/_layouts/default/estados';

const schema = Yup.object().shape({
  cpf: Yup.string()
    .min(14, 'O CPF precisa ter no mínimo 11 dígitos')
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
  const [loading, setLoading] = useState('');
  const [cpf, setCPF] = useState('');

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function Limpar() {
    window.location.reload();
  }

  async function consultar() {
    try {
      setLoading(true);
      if (!isCPF(cpf)) {
        toast.error('CPF inválido!');
        setLoading(false);
      } else {
        const response = await api.post('consultacpf', {
          cpf: input,
        });
        setResult(response.data);
        setLoading(false);
      }
    } catch (err) {
      toast.error('CPF não encontrado na base de dados.');
      setInput('');
      setLoading(false);
    }
  }

  function ConditionalRender() {
    if (result.name === '') {
      return (
        <>
          <h4> Digite o CPF e depois clique em Consultar:</h4>
          <Form schema={schema} onSubmit={consultar}>
            <Input
              name="cpf"
              value={(input, cpfMask(cpf))}
              placeholder=" Digite o CPF"
              onInput={e => setInput(e.target.value)}
              autoComplete="off"
              onChange={e => setCPF(e.target.value)}
            />
            <hr />
            <button type="submit">
              {loading ? 'Carregando...' : 'Consultar'}
            </button>
            <hr />
          </Form>
        </>
      );
    }

    return (
      <>
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
            onChange={e =>
              setResult({ ...result, uf_pendencia: e.target.value })
            }
            options={estados}
          />

          <button type="submit">Alterar Pendência</button>
          <hr />
        </Form>
        <button type="button" onClick={Limpar}>
          Nova Consulta
        </button>
      </>
    );
  }
  return (
    <LoadingOverlay
      active={loading}
      styles={{
        overlay: base => ({
          ...base,
          background: 'rgb(0, 0, 0) transparent',
        }),
      }}
      spinner
      text="Buscando CPF..."
    >
      <Container>
        <header>
          <strong>Consultar pessoas e alterar pendência</strong>
        </header>

        {ConditionalRender()}
      </Container>
    </LoadingOverlay>
  );
}
