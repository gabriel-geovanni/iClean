const RatingsRepository = require('../repositories/RatingsRepository');
const UsersRepository = require('../repositories/UsersRepository');

class UserController {
  async index(request, response) {
    const { orderBy } = request.query;
    const users = await UsersRepository.findAll(orderBy);
    const list = await Promise.all(users.map(async (user) => {
      const average = await RatingsRepository.findByCpf(user.cpf);
      return { ...user, average };
    }));

    response.json(list);
  }

  async show(request, response) {
    const { cpf } = request.params;
    const user = await UsersRepository.findByCpf(cpf);

    if (!user) {
      return response.status(404).json({ error: 'Usuário não encontrado' });
    }

    const average = await RatingsRepository.findByCpf(cpf);

    response.json({ ...user, average });
  }

  async store(request, response) {
    const {
      cpf, name, email, phone,
    } = request.body;

    if (!cpf) {
      return response.status(400).json({ error: 'Campo CPF é obrigatório' });
    }

    const userExists = await UsersRepository.findByCpf(cpf);

    if (userExists) {
      return response.status(400).json({ error: 'Esse CPF já está cadastrado' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Campo NOME é obrigatório' });
    }

    if (!phone && !email) {
      return response.status(400).json({ error: 'Necessário informar uma forma de contato' });
    }

    const usersEmailExists = await UsersRepository.findByEmail(email);

    if (usersEmailExists) {
      return response.status(400).json({ error: 'Esse e-mail já está cadastrado' });
    }

    const user = await UsersRepository.create({
      cpf, name, email, phone,
    });

    const rate = await RatingsRepository.create({
      cpf,
    });

    if (!rate) {
      await UsersRepository.delete(cpf);
      return response.staus(400);
    }

    response.json(user);
  }

  async update(request, response) {
    const { cpf } = request.params;
    const {
      name, email, phone,
    } = request.body;

    const usersExists = await UsersRepository.findByCpf(cpf);
    if (!usersExists) {
      return response.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Campo NOME é obrigatório' });
    }

    if (!email) {
      return response.status(400).json({ error: 'Campo E-MAIL é obrigatório' });
    }

    if (!phone) {
      return response.status(400).json({ error: 'Número de telefone é obrigatório' });
    }

    const usersByEmail = await UsersRepository.findByEmail(email);

    if (usersByEmail && usersByEmail.cpf !== cpf) {
      return response.status(400).json({ error: 'Esse e-mail já está cadastrado' });
    }

    const user = await UsersRepository.update(cpf, {
      name, email, phone,
    });

    response.json(user);
  }

  async delete(request, response) {
    const { cpf } = request.params;

    await UsersRepository.delete(cpf);
    response.sendStatus(204);
  }
}

module.exports = new UserController();
