const CandidatesRepository = require('../repositories/CandidatesRepository');
const AdsRepository = require('../repositories/AdsRepository');
const UsersRepository = require('../repositories/UsersRepository');

class CandidateController {
  async candidacies(request, response) {
    const { ad_id } = request.params;

    const adExists = await AdsRepository.findById(ad_id);
    if (!adExists) {
      return response.status(400).json({ error: 'Esse anúncio não existe!' });
    }

    const candidates = await CandidatesRepository.listCandidates(ad_id);
    response.json(candidates);
  }

  async ads(request, response) {
    const { cpf } = request.params;

    const cpfExists = await UsersRepository.findByCpf(cpf);
    if (!cpfExists) {
      return response.status(404).json({ error: 'CPF não encontrado' });
    }

    const ads = await CandidatesRepository.listAds(cpf);
    response.json(ads);
  }

  async store(request, response) {
    const {
      cpf, ad_id,
    } = request.body;

    if (!cpf) {
      return response.status(400).json({ error: 'Digite um CPF' });
    }

    const cpfExists = await UsersRepository.findByCpf(cpf);

    if (!cpfExists) {
      return response.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (!ad_id) {
      return response.status(400).json({ error: 'Escolha um anúncio' });
    }

    const adExists = await AdsRepository.findById(ad_id);

    if (!adExists) {
      return response.status(400).json({ error: 'Esse anúncio não existe!' });
    }

    const candidate = await CandidatesRepository.create({
      cpf, ad_id,
    });

    response.json(candidate);
  }

  async delete(request, response) {
    const { cpf, ad_id } = request.params;

    await CandidatesRepository.delete(cpf, ad_id);
    response.sendStatus(204);
  }
}

module.exports = new CandidateController();
