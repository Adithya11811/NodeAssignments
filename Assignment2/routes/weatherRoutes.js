const express = require('express');
const router = express.Router();
const weatherHandler = require('../handlers/weatherHandlers');

router.get('/weather', weatherHandler.showAllDetails);
router.get('/weather/rain', weatherHandler.showRainDetails);
router.post('/weather', weatherHandler.addNewCityTempDetails);
router.patch('/weather/rain/:city', weatherHandler.changeRainDetails);
router.delete('/weather/:city', weatherHandler.removeCityDetails);
router.get('/weather/:city', weatherHandler.showDetailOfSpecificCity);

module.exports = router;
