const db = require('../../database');

class ServicesRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM services ORDER BY price ${direction}`);

    return rows;
  }

  async findByCpf(cpf) {
    const rows = await db.query(`
    SELECT *
    FROM services S
    WHERE S.cpf_provider = $1 OR S.cpf_customer = $1
    `, [cpf]);

    return rows;
  }

  async findByType(type) {
    const [row] = await db.query('SELECT * FROM services S WHERE S.type = $1', [type]);

    return row;
  }

  async create({
    type, price, date, description, cpf_provider, rateProvider, cpf_customer, rateCustomer, ad_id,
  }) {
    const [row] = await db.query(`
    INSERT INTO services(type, price, date, description, cpf_provider, rateProvider,
                          cpf_customer, rateCustomer, ad_id)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING *
    `, [type, price, date, description, cpf_provider, rateProvider, cpf_customer, rateCustomer, ad_id]);

    return row;
  }

  async update(id, {
    type, price, date, rateProvider, rateCustomer,
  }) {
    const [row] = await db.query(`
      UPDATE services
      SET type = $1, price = $2, date = $3, rateProvider = $4, rateCustomer = $5
      WHERE id = $6
      RETURNING *
    `, [type, price, date, rateProvider, rateCustomer, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM services S WHERE S.id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new ServicesRepository();
