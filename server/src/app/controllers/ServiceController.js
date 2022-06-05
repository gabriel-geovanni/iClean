const ServicesRepository = require('../repositories/ServicesRepository');
const UsersRepository = require('../repositories/UsersRepository');
const AdsRepository = require('../repositories/AdsRepository');

class ServiceController {
  async index(request, response) {
    const { orderBy } = request.query;
    const services = await ServicesRepository.findAll(orderBy);

    response.json(services);
  }

  async show(request, response) {
    const { id } = request.params;
    const service = await ServicesRepository.findById(id);

    if (!service) {
      return response.status(404).json({ error: 'Serviço não encontrserviceo' });
    }

    response.json(service);
  }

  async store(request, response) {
    const {
      type, price, date, status, cpf_provider, cpf_customer, ad_id,
    } = request.body;

    if (!type) {
      return response.status(400).json({ error: 'Campo TIPO é obrigatório' });
    }

    if (!price) {
      return response.status(400).json({ error: 'Necessário informar o valor do serviço' });
    }

    if (!date) {
      return response.status(400).json({ error: 'Necessário informar a data que foi efetuado' });
    }

    if (!cpf_provider) {
      return response.status(400).json({ error: 'Necessário quem efetuou o serviço' });
    }

    const cpfProviderExists = await UsersRepository.findByCpf(cpf_provider);
    if (!cpfProviderExists) {
      return response.status(404).json({ error: 'CPF do prestador não encontrado' });
    }

    if (!cpf_customer) {
      return response.status(400).json({ error: 'Necessário informar quem contratou o serviço' });
    }

    const cpfCustomerExists = await UsersRepository.findByCpf(cpf_customer);
    if (!cpfCustomerExists) {
      return response.status(404).json({ error: 'CPF do contratante não encontrado' });
    }

    if (!ad_id) {
      return response.status(400).json({ error: 'Necessário informar o anúncio' });
    }

    const adExists = await AdsRepository.findById(ad_id);
    if (!adExists) {
      return response.status(404).json({ error: 'Informe um anúncio válido!' });
    }

    const service = await ServicesRepository.create({
      type, price, date, status: status !== 't', cpf_provider, cpf_customer, ad_id,
    });

    response.json(service);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      type, price, date, status,
    } = request.body;

    const servicesExists = await ServicesRepository.findById(id);
    if (!servicesExists) {
      return response.status(404).json({ error: 'Você não possui serviços' });
    }

    if (!type) {
      return response.status(400).json({ error: 'Campo TIPO é obrigatório' });
    }

    if (!price) {
      return response.status(400).json({ error: 'Necessário informar o valor do serviço' });
    }

    if (!date) {
      return response.status(400).json({ error: 'Necessário informar a data que foi efetuado' });
    }

    if (!status) {
      return response.status(400).json({ error: 'Necessário informar o status do serviço' });
    }

    const service = await ServicesRepository.update(id, {
      type, price, date, status,
    });

    response.json(service);
  }

  async delete(request, response) {
    const { id } = request.params;

    await ServicesRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new ServiceController();
