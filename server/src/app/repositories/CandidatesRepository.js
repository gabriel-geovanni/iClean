const db = require('../../database');
const RatingsRepository = require('./RatingsRepository');
const UsersRepository = require('./UsersRepository');

class CandidatesRepository {
  async listCandidates(ad_id) {
    const candidates = await db.query('SELECT * FROM candidates C WHERE C.ad_id = $1', [ad_id]);
    const list = await Promise.all(candidates.map(async (candidate) => {
      const user = await UsersRepository.findByCpf(candidate.ucpf);
      const average = await RatingsRepository.findByCpf(candidate.ucpf);
      return { ...candidate, user, average };
    }));

    return list;
  }

  async listAds(cpf) {
    const candidates = await db.query('SELECT C.ad_id FROM candidates C WHERE C.ucpf = $1', [cpf]);

    return candidates;
  }

  async create({
    cpf, ad_id,
  }) {
    const [row] = await db.query(`
    INSERT INTO candidates(ucpf, ad_id)
    VALUES($1,$2)
    RETURNING *
    `, [cpf, ad_id]);

    return row;
  }

  async delete(cpf, ad_id) {
    const deleteOp = await db.query(`
    DELETE FROM candidates C
    WHERE C.ucpf = $1 AND C.ad_id = $2
    `, [cpf, ad_id]);
    return deleteOp;
  }
}

module.exports = new CandidatesRepository();
