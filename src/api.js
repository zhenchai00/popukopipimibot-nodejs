require('dotenv').config();

const MetToken = process.env.MET_TOKEN;
const log = require('npmlog');
const axios = require('axios');
const querystring = require('querystring');

exports.getWeather = async (url, data, custom) => {
    try {
        let query = querystring.stringify(data);
        let config = {
            headers: {
                "Content-type": "Application/json",
                'Authorization': 'METToken ' + MetToken
            }
        };
        let requestUrl = url + query
        log.warn('[getWeather] - ' + __filename, 'requestUrl - ' + requestUrl);
        let response = await axios.get(requestUrl, config);

        return response.data;

    } catch (error) {
        log.error('[getWeather] ' + __filename, 'error - ' + error);
    }
}