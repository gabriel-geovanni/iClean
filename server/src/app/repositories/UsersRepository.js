const db = require('../../database');

class UsersRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM users ORDER BY name ${direction}`);
    return rows;
  }

  async findByCpf(cpf) {
    const [row] = await db.query('SELECT * FROM users U WHERE U.cpf = $1', [cpf]);

    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM users U WHERE U.email = $1', [email]);

    return row;
  }

  async create({
    cpf, name, password, email, phone,
  }) {
    const [row] = await db.query(`
    INSERT INTO users(cpf, name, password, email, phone)
    VALUES($1,$2,$3,$4,$5)
    RETURNING *
    `, [cpf, name, password, email, phone]);

    return row;
  }

  async update(cpf, {
    email, phone,
  }) {
    const [row] = await db.query(`
      UPDATE users U
      SET email = $1, phone = $2
      WHERE U.cpf = $3
      RETURNING *
    `, [email, phone, cpf]);
    return row;
  }

  async delete(cpf) {
    const deleteOp = await db.query('DELETE FROM users U WHERE U.cpf = $1', [cpf]);
    return deleteOp;
  }
}

module.exports = new UsersRepository();
