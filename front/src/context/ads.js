import React, {
  createContext, useState, useContext,
} from 'react';
import {
  createAd, deleteAd,
  editAd,
  excludeCandidate, listCandidates, loadAds, loadAdsCandidate, setCandidate,
  createService,
  listService,
  rateServices
} from '../services';

export const AdsContext = createContext();

export function AdsProvider({ children }) {
  const [listAds, setListAds] = useState([]);
  const [listAdsCandidate, setListAdsCandidate] = useState([]);
  const [listCandidateAds, setListCandidateAds] = useState([]);
  const [listCandidateServices, setListCandidateServices] = useState([]);
  const [rateUserService, loadServiceRate] = useState([]);

  async function loadListAds() {
    const list = await loadAds();
    setListAds(list)
  }

  async function createAds(type, price, description, availability, cpf, callback) {
    const ad = await createAd(type, price, description, availability, cpf)
    if(ad.id) {
      loadListAds();
      callback()
    }
  }
  async function editAds(type, price, description, availability, cpf, id, callback) {
    const ad = await editAd(type, price, description, availability, cpf, id)
    if(ad.id) {
      loadListAds();
      callback()
    }
  }
  async function deleteAds(id) {
    await deleteAd(id)
    setListAds((prevState) => prevState.filter((state) => state.id !== id))
  }
  async function postCadidate(id, cpf) {
    const res = await setCandidate(id, cpf)
    if(res) {
      setListAdsCandidate((prevState) => [id, ...prevState])
    }
  }


  async function loadListAdsCandidate(cpf) {
    const list = await loadAdsCandidate(cpf)
    if(list) {
      setListAdsCandidate(list.map((i) => (i.ad_id)))
    }
  }

  async function deleteCadidate(id, cpf) {
    const res = await excludeCandidate(id, cpf)
    setListAdsCandidate((prevState) => prevState.filter((j) => j !== id))
  }

  async function listAllCadidate(id) {
    const res = await listCandidates(id)
    if(res.length) { setListCandidateAds(res) } else { setListCandidateAds([]) }
  }
  async function createServices(type, price, date, cpf_provider, cpf_customer, ad_id, callback) {
    const res = await createService(type, price, date, cpf_provider, cpf_customer, ad_id)
    if(res.id) {
      loadListAds()
    }
    callback()
  }
  async function listServices(cpf) {
    const res = await listService(cpf)
    if(res) {
      setListCandidateServices(res)
    }
  }

  async function rateService(
    {
      id,
      totalRatingsProvider,
      totalRatingsCustomer,
      cpf
    }
  ) {
    console.log('chegou aqui');
    const res = await rateServices({
      id,
      totalRatingsProvider,
      totalRatingsCustomer,
      cpf
    })
    if(res) {
      loadServiceRate(res)
    }
  }

  return (
    <AdsContext.Provider value={{
      listAds,
      loadListAds,
      createAds,
      listAdsCandidate,
      loadListAdsCandidate,
      deleteAds,
      postCadidate,
      deleteCadidate,
      listAllCadidate,
      editAds,
      listCandidateAds,
      createServices,
      listServices,
      listCandidateServices,
      rateService

    }}
    >
      {children}
    </AdsContext.Provider>
  );
}

export function useAds() {
  const context = useContext(AdsContext);
  return context;
}
