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
      cpf, name, password, email, phone,
    } = request.body;

    if (!cpf) {
      return response.status(400).json({ error: 'Digite um cpf' });
    }

    const userExists = await UsersRepository.findByCpf(cpf);

    if (userExists) {
      return response.status(400).json({ error: 'Esse CPF já está cadastrado' });
    }

    if (!password) {
      return response.status(400).json({ error: 'Digite uma senha' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Digite um nome' });
    }

    if (!phone && !email) {
      return response.status(400).json({ error: 'Necessário informar uma forma de contato' });
    }

    const usersEmailExists = await UsersRepository.findByEmail(email);

    if (usersEmailExists) {
      return response.status(400).json({ error: 'Esse e-mail já está cadastrado' });
    }

    const user = await UsersRepository.create({
      cpf, name, password, email, phone,
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

  async login(request, response) {
    const {
      cpf, password,
    } = request.body;

    if (!cpf) {
      return response.status(400).json({ error: 'Digite um cpf' });
    }

    const userExists = await UsersRepository.findByCpf(cpf);

    if (!userExists) {
      return response.status(400).json({ error: 'Usuário não encontrado' });
    }

    if (!password) {
      return response.status().jeson({ error: 'Digite uma senha' });
    }

    if (userExists.password !== password) {
      return response.status(406).json({ error: 'Senha incorreta' });
    }

    response.json(userExists);
  }

  async update(request, response) {
    const { cpf } = request.params;
    const {
      email, phone,
    } = request.body;

    const usersExists = await UsersRepository.findByCpf(cpf);
    if (!usersExists) {
      return response.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (!phone && !email) {
      return response.status(400).json({ error: 'Necessário escolher uma forma de contato' });
    }

    const usersByEmail = await UsersRepository.findByEmail(email);

    if (usersByEmail && usersByEmail.cpf !== cpf) {
      return response.status(400).json({ error: 'Esse e-mail já está cadastrado' });
    }

    const user = await UsersRepository.update(cpf, {
      email, phone,
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
