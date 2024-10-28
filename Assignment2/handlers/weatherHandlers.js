const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/weatherData.json');

const readData = () => {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

const showAllDetails = (req, res) => {
    const weatherData = readData();
    res.json(weatherData);
};

const showRainDetails = (req, res) => {
    const weatherData = readData();
    const rainData = weatherData.filter(city => city.rain);
    res.json(rainData);
};

const addNewCityTempDetails = (req, res) => {
    const newCity = req.body;
    const weatherData = readData();
    weatherData.push(newCity);
    writeData(weatherData);
    res.status(201).json(newCity);
};

const changeRainDetails = (req, res) => {
    const { city } = req.params;
    const weatherData = readData();
    const cityData = weatherData.find(c => c.city.toLowerCase() === city.toLowerCase());

    if (cityData) {
        cityData.rain = false;
        writeData(weatherData);
        res.json(cityData);
    } else {
        res.status(404).send('City not found');
    }
};

const removeCityDetails = (req, res) => {
    const { city } = req.params;
    let weatherData = readData();
    weatherData = weatherData.filter(c => c.city.toLowerCase() !== city.toLowerCase());
    writeData(weatherData);
    res.sendStatus(204);
};

const showDetailOfSpecificCity = (req, res) => {
    const { city } = req.params;
    const weatherData = readData();
    const cityData = weatherData.find(c => c.city.toLowerCase() === city.toLowerCase());

    if (cityData) {
        res.json(cityData);
    } else {
        res.status(404).send('City not found');
    }
};

module.exports = {
    showAllDetails,
    showRainDetails,
    addNewCityTempDetails,
    changeRainDetails,
    removeCityDetails,
    showDetailOfSpecificCity
};
