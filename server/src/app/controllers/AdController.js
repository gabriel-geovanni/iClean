const AdsRepository = require('../repositories/AdsRepository');
const UsersRepository = require('../repositories/UsersRepository');

class AdController {
  async index(request, response) {
    const { orderBy } = request.query;
    const ads = await AdsRepository.findAll(orderBy);

    response.json(ads);
  }

  async show(request, response) {
    const { id } = request.params;
    const ad = await AdsRepository.findById(id);

    if (!ad) {
      return response.status(404).json({ error: 'Esse anúncio não existe!' });
    }

    response.json(ad);
  }

  async store(request, response) {
    const {
      type, price, description, availability, status, cpf,
    } = request.body;

    if (!type) {
      return response.status(400).json({ error: 'Campo TIPO é obrigatório' });
    }

    if (!price) {
      return response.status(400).json({ error: 'Necessário informar o valor do serviço' });
    }

    if (!availability) {
      return response.status(400).json({ error: 'Necessário informar sua disponibilidade' });
    }

    if (!cpf) {
      return response.status(400).json({ error: 'Necessário informar o CPF do criador do anúncio' });
    }

    const usersExists = await UsersRepository.findByCpf(cpf);
    if (!usersExists) {
      return response.status(404).json({ error: 'Usuário não encontrado' });
    }

    const ad = await AdsRepository.create({
      type, price, description, availability, status: status !== 'f', cpf,
    });

    response.json(ad);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      type, price, description, availability, status,
    } = request.body;

    const adssExists = await AdsRepository.findById(id);
    if (!adssExists) {
      return response.status(404).json({ error: 'Você não possui anúncios' });
    }

    if (!type) {
      return response.status(400).json({ error: 'Campo TIPO é obrigatório' });
    }

    if (!price) {
      return response.status(400).json({ error: 'Necessário informar o valor do serviço' });
    }

    if (!availability) {
      return response.status(400).json({ error: 'Necessário informar sua disponibilidade' });
    }

    const ad = await AdsRepository.update(id, {
      type, price, description, availability, status,
    });

    response.json(ad);
  }

  async delete(request, response) {
    const { id } = request.params;

    await AdsRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new AdController();
