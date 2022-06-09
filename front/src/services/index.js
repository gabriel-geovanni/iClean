import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 30000,
});

export async function loadAds() {
  const { data } = await api.get('/ads');
  return data
}
export async function loadAdsCandidate(cpf) {
  const { data } = await api.get(`/candidatesAds/${cpf}`);
  return data
}
export async function login(cpf, password) {
  const { data } = await api.get(`/users/${cpf}/${password}`);
  return data
}
export async function register(cpf, name, password, phone, email) {
  const { data } = await api.post('/users', {
    cpf, name, password, phone, email
  });
  return data
}

export async function createAd(type, price, description, availability, cpf) {
  const { data } = await api.post('/ads', {
    type, price, description, availability, cpf, status: true
  });
  return data
}
export async function editAd(type, price, description, availability, cpf, id) {
  const { data } = await api.put(`/ads/${id}`, {
    type, price, description, availability, cpf,
  });
  return data
}

export async function deleteAd(id) {
  const { data } = await api.delete(`/ads/${id}`);
  return data
}

export async function listCandidates(id) {
  const { data } = await api.get(`/candidates/${id}`);
  return data
}


export async function setCandidate(id, cpf) {
  const { data } = await api.post('/candidates', {
    ad_id: id,
    cpf
  });
  return data
}

export async function excludeCandidate(id, cpf) {
  const { data } = await api.delete(`/candidates/${cpf}/${id}`);
  return data
}
export async function createService(type, price, date, cpf_provider, cpf_customer, ad_id) {
  const { data } = await api.post('/services', {
    type, price, date, status: 't', cpf_provider, cpf_customer, ad_id
  });
  return data
}

export async function listService(cpf) {
  const { data } = await api.get(`/services/${cpf}`);
  return data
}

export async function rateServices({
  id,
  totalRatingsProvider,
  totalRatingsCustomer,
  cpf

}) {
  const { data } = await api.put(`/ratings/${cpf}`, {
    id,
    totalRatingsProvider,
    totalRatingsCustomer,
  });

  // entrar na tabela de rate do usuario e somar
  // alterar status de rate do servico do usuario diferente do cpf


  return data
}
