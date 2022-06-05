const db = require('../../database');

class RatingsRepositoy {
  async findAll() {
    const rows = await db.query('SELECT * FROM ratings');
    return rows;
  }

  async findByCpf(cpf) {
    const [row] = await db.query('SELECT * FROM ratings R WHERE R.ucpf = $1', [cpf]);

    const average = {
      provider: Number((row.totalratingsprovider / row.ratingcounterprovider).toFixed(2)) || 0,
      customer: Number((row.totalratingscustomer / row.ratingcountercustomer).toFixed(2)) || 0,
    };

    return average;
  }

  async create({
    cpf, totalRatingsProvider = 0,
    ratingCounterProvider = 0,
    totalRatingsCustomer = 0,
    ratingCounterCustomer = 0,
  }) {
    const [row] = await db.query(`
    INSERT INTO ratings(ucpf, totalRatingsProvider, ratingCounterProvider, totalRatingsCustomer, ratingCounterCustomer )
    VALUES($1,$2,$3, $4, $5)
    RETURNING *
    `, [cpf, totalRatingsProvider, ratingCounterProvider, totalRatingsCustomer, ratingCounterCustomer]);

    return row;
  }

  async update(cpf, {
    totalRatingsProvider, totalRatingsCustomer,
  }) {
    if (totalRatingsCustomer > 0) {
      const [row] = await db.query(`
      UPDATE ratings
      SET totalRatingsCustomer = totalRatingsCustomer + $1,
      ratingCounterCustomer = ratingCounterCustomer + 1
      WHERE ucpf = $2
      RETURNING *
    `, [totalRatingsCustomer, cpf]);
      return row;
    }
    if (totalRatingsProvider > 0) {
      const [row] = await db.query(`
      UPDATE ratings
      SET totalRatingsProvider = totalRatingsProvider + $1,
      ratingCounterProvider = ratingCounterProvider + 1
      WHERE ucpf = $2
      RETURNING *
    `, [totalRatingsProvider, cpf]);
      return row;
    }

    return false;
  }
}

module.exports = new RatingsRepositoy();
