const db = require('../../database');

class UsersRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM users ORDER BY name ${direction}`);
    return rows.map((row) => ({ ...row, password: '' }));
  }

  async findByCpf(cpf, type = 'default') {
    const [user] = await db.query('SELECT * FROM users U WHERE U.cpf = $1', [cpf]);
    if (type === 'login') return { ...user };
    if (user?.name) { return { ...user, password: '' }; }
    return null;
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
    password, email, phone,
  }) {
    const [row] = await db.query(`
      UPDATE users U
      SET password = $1, email = $2, phone = $3
      WHERE U.cpf = $4
      RETURNING *
    `, [password, email, phone, cpf]);
    return row;
  }

  async delete(cpf) {
    const deleteOp = await db.query('DELETE FROM users U WHERE U.cpf = $1', [cpf]);
    return deleteOp;
  }
}

module.exports = new UsersRepository();
