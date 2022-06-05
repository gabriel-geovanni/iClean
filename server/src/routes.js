const { Router } = require('express');

const UserController = require('./app/controllers/UserController');
const AdController = require('./app/controllers/AdController');
const ServiceController = require('./app/controllers/ServiceController');
const CandidateController = require('./app/controllers/CandidateController');
const RatingController = require('./app/controllers/RatingController');

const router = Router();

router.get('/users', UserController.index);
router.get('/users/:cpf', UserController.show);
router.delete('/users/:cpf', UserController.delete);
router.post('/users', UserController.store);
router.put('/users/:cpf', UserController.update);

router.get('/ads', AdController.index);
router.get('/ads/:id', AdController.show);
router.delete('/ads/:id', AdController.delete);
router.post('/ads', AdController.store);
router.put('/ads/:id', AdController.update);

router.get('/services', ServiceController.index);
router.get('/services/:id', ServiceController.show);
router.delete('/services/:id', ServiceController.delete);
router.post('/services', ServiceController.store);
router.put('/services/:id', ServiceController.update);

router.get('/candidates/:ad_id', CandidateController.candidacies);
router.get('/candidatesAds/:cpf', CandidateController.ads);
router.delete('/candidates/:cpf/:ad_id', CandidateController.delete);
router.post('/candidates', CandidateController.store);

router.get('/ratings', RatingController.index);
router.put('/ratings/:cpf', RatingController.update);

module.exports = router;
