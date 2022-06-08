const AdsRepository = require('../repositories/AdsRepository');
const UsersRepository = require('../repositories/UsersRepository');

class AdController {
  async index(request, response) {
    const { orderBy } = request.query;
    const ads = await AdsRepository.findAll(orderBy);
    response.header('Access-Control-Allow-Origin', '*');
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
      return response.status(400).json({ error: 'Digite o tipo do serviço' });
    }

    if (!price) {
      return response.status(400).json({ error: 'Digite um valor' });
    }

    if (!availability) {
      return response.status(400).json({ error: 'Informe sua disponibilidade para o serviço' });
    }

    if (!cpf) {
      return response.status(400).json({ error: 'Informe o cpf do criado do anúncio' });
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
      type, price, description, availability, cpf,
    } = request.body;
    console.log({
      id, type, price, description, availability,
    });

    const adssExists = await AdsRepository.findById(id);
    if (!adssExists) {
      return response.status(404).json({ error: 'Você não possui anúncios' });
    }

    if (!type) {
      return response.status(400).json({ error: 'Digite o tipo do anúncio' });
    }

    if (!price) {
      return response.status(400).json({ error: 'Digite um valor' });
    }

    if (!availability) {
      return response.status(400).json({ error: 'Informe sua disponibilidade para o serviço' });
    }

    const ad = await AdsRepository.update(id, {
      type, price, description, availability, cpf,
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
