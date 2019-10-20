import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import api from '~/services/api';

import { Container } from './styles';

export default function Home() {
  const [result, setResult] = useState({
    dados: [],
  });

  const [input, setInput] = useState('');

  async function consultar() {
    const response = await api.post('consultacpf', {
      cpf: input,
    });
    setResult(response.data);
  }
  return (
    <Container>
      <header>
        <strong>Consultar Pessoas</strong>
      </header>
      <h3> Digite o CPF e depois clique em Consultar</h3>
      <Form onSubmit>
        <hr />

        <Input
          name="cpf"
          value={input}
          placeholder="CPF"
          onInput={e => setInput(e.target.value)}
          autocomplete="off"
        />
        <hr />
        <button type="button" onClick={consultar}>
          Consultar
        </button>
      </Form>
    </Container>
  );
}
