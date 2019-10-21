import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { updateProfileSuccess, updateProfileFailure } from './actions';

import api from '~/services/api';

export function* updateProfile({ payload }) {
  try {
    // const { pendencia, uf_pendencia } = payload.data;

    const response = yield call(api.put, 'pessoas', payload.data);

    toast.success('Perfil atualizado');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar perfil');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
