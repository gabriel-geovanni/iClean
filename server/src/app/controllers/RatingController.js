const RatingsRepository = require('../repositories/RatingsRepository');
const ServicesRepository = require('../repositories/ServicesRepository');

class RatingController {
  async index(request, response) {
    const ratings = await RatingsRepository.findAll();

    response.json(ratings);
  }

  async update(request, response) {
    const { cpf } = request.params;
    const {
      id, totalRatingsProvider, ratingCounterProvider, totalRatingsCustomer, ratingCounterCustomer,
    } = request.body;

    const rating = await RatingsRepository.update(cpf, {
      totalRatingsProvider, ratingCounterProvider, totalRatingsCustomer, ratingCounterCustomer,
    });

    await ServicesRepository(
      id,
      { rateProvider: totalRatingsProvider > 0 ? 't' : 'f', rateCustomer: totalRatingsCustomer > 0 ? 't' : 'f' },
    );

    response.json(rating);
  }
}

module.exports = new RatingController();
