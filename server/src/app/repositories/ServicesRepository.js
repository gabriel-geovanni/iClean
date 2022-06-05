const db = require('../../database');

class ServicesRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM services ORDER BY price ${direction}`);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM services S WHERE S.id = $1', [id]);

    return row;
  }

  async findByType(type) {
    const [row] = await db.query('SELECT * FROM services S WHERE S.type = $1', [type]);

    return row;
  }

  async create({
    type, price, date, status, cpf_provider, cpf_customer, ad_id,
  }) {
    const [row] = await db.query(`
    INSERT INTO services(type, price, date, status, cpf_provider, cpf_customer, ad_id)
    VALUES($1,$2,$3,$4,$5,$6,$7)
    RETURNING *
    `, [type, price, date, status, cpf_provider, cpf_customer, ad_id]);

    return row;
  }

  async update(id, {
    type, price, date, status,
  }) {
    const [row] = await db.query(`
      UPDATE services
      SET type = $1, price = $2, date = $3, status = $4
      WHERE id = $5
      RETURNING *
    `, [type, price, date, status, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM services S WHERE S.id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new ServicesRepository();
