const db = require('../../database');
const UsersRepository = require('./UsersRepository');
const RatingsRepository = require('./RatingsRepository');

class AdsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const ads = await db.query(`SELECT * FROM ads ORDER BY price ${direction}`);
    const list = await Promise.all(ads.map(async (ad) => {
      const user = await UsersRepository.findByCpf(ad.ucpf);
      const average = await RatingsRepository.findByCpf(ad.ucpf);
      return { ...ad, user, average };
    }));

    return list;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM ads A WHERE A.id = $1', [id]);

    return row;
  }

  async create({
    type, price, description, availability, status, cpf,
  }) {
    const [row] = await db.query(`
    INSERT INTO ads(type, price, description, availability, status, ucpf)
    VALUES($1,$2,$3,$4,$5,$6)
    RETURNING *
    `, [type, price, description, availability, status, cpf]);

    return row;
  }

  async update(id, {
    type, price, description, availability, status,
  }) {
    const [row] = await db.query(`
      UPDATE ads
      SET type = $1, price = $2, description = $3, availability = $4, status = $5
      WHERE id = $6
      RETURNING *
    `, [type, price, description, availability, status, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM ads A WHERE A.id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new AdsRepository();
