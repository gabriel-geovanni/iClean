const RatingsRepository = require('../repositories/RatingsRepository');

class RatingController {
  async index(request, response) {
    const ratings = await RatingsRepository.findAll();

    response.json(ratings);
  }

  async update(request, response) {
    const { cpf } = request.params;
    const {
      totalRatingsProvider, ratingCounterProvider, totalRatingsCustomer, ratingCounterCustomer,
    } = request.body;

    const rating = await RatingsRepository.update(cpf, {
      totalRatingsProvider, ratingCounterProvider, totalRatingsCustomer, ratingCounterCustomer,
    });

    response.json(rating);
  }
}

module.exports = new RatingController();
