
const common = require('../common.js');
const api = require('../api.js');
const log = require('npmlog');

/**
 * Constant of differentiate the ID
 */
const MET_SET_ID_WEATHER       = 'FORECAST';
const MET_SET_ID_WARNING       = 'WARNING';
const MET_SET_ID_OBSERVATION   = 'OBSERVATION';

/**
 * Constant of differentiate the Categories ID
 */
const MET_CAT_ID_GENERAL        = 'GENERAL';
const MET_CAT_ID_WINDSEA        = 'WINDSEA';
const MET_CAT_ID_WINDSEA2       = 'WINDSEA2';
const MET_CAT_ID_RAIN           = 'RAIN';
const MET_CAT_ID_RAINS          = 'RAINS';
const MET_CAT_ID_CYCLONE        = 'CYCLONE';
const MET_CAT_ID_CYCLONE2       = 'CYCLONE2';
const MET_CAT_ID_QUAKETSUNAMI   = 'QUAKETSUNAMI';
const MET_CAT_ID_QUAKETSUNAMI2  = 'QUAKETSUNAMI2';
const MET_CAT_ID_RADAR          = 'RADAR';
const MET_CAT_ID_SATELLITE      = 'SATELLITE';
const MET_CAT_ID_MARINE         = 'MARINE';
const MET_CAT_ID_THUNDERSTORM   = 'THUNDERSTORM';
const MET_CAT_ID_THUNDERSTORM2  = 'THUNDERSTORM2';
const MET_CAT_ID_HOURLY         = 'HOURLY';

const MET_TYPE_FORECAST_GENERAL_DAILY_MORNING                       = 'FGM';
const MET_TYPE_FORECAST_GENERAL_DAILY_AFTERNOON                     = 'FGA';
const MET_TYPE_FORECAST_GENERAL_DAILY_NIGHT                         = 'FGN';
const MET_TYPE_FORECAST_GENERAL_DAILY_MAXIMUM_TEMPERATURE           = 'FMAXT';
const MET_TYPE_FORECAST_GENERAL_DAILY_MINIMUM_TEMPERATURE           = 'FMINT';
const MET_TYPE_FORECAST_GENERAL_DAILY_SIGNIFICANT_WEATHER           = 'FSIGW';
const MET_TYPE_WARNING_STRONG_WIND_ROUGH_SEA                        = 'WINDSEA';
const MET_TYPE_WARNING_HEAVY_RAIN                                   = 'RAIN';
const MET_TYPE_WARNING_TROPICAL_CYCLONE                             = 'CYCLONE';
const MET_TYPE_ALERT_EARTHQUAKE_TSUNAMI                             = 'QUAKETSUNAMI';
const MET_TYPE_OBSERVATION_RADAR_MALAYSIA                           = 'RADARMY';
const MET_TYPE_OBSERVATIONS_RADAR_PENINSULA_MALAYSIA                = 'RADARPENINSULAMY';
const MET_TYPE_OBSERVATIONS_RADAR_SABAH_SARAWAK                     = 'RADARSABAHSARAWAK';
const MET_TYPE_OBSERVATIONS_SATELLITE_HIMAWARI_8_ASIAN_INFRA_RED_BAND = 'SATHIMAWARI';
const MET_TYPE_OBSERVATIONS_SATELLITE_FENG_YUN_2G_INFRA_RED_BAND    = 'SATFY2G';
const MET_TYPE_OBSERVATIONS_SATELLITE_NOAA_PENINSULA_SUMATERA       = 'SATNOAA';
const MET_TYPE_OBSERVATIONS_SATELLITE_TERRA_AQUA_HOTSPOT_PENINSULA  = 'SATTERRAAQUA';
const MET_TYPE_FORECAST_MARINE_DAILY_MORNING                        = 'FMM';
const MET_TYPE_FORECAST_MARINE_DAILY_AFTERNOON                      = 'FMA';
const MET_TYPE_FORECAST_MARINE_DAILY_NIGHT                          = 'FMN';
const MET_TYPE_FORECAST_MARINE_DAILY_SIGNIFICANT_WEATHER            = 'FMSIGW';
const MET_TYPE_FORECAST_MARINE_WIND_DIRECTION                       = 'FMWD';
const MET_TYPE_FORECAST_MARINE_WIND_SPEED                           = 'FMWS';
const MET_TYPE_FORECAST_MARINE_WAVE_HEIGHT                          = 'FMWH';
const MET_TYPE_WARNING_STRONG_WIND_ROUGH_SEA_2                      = 'WINDSEA2';
const MET_TYPE_WARNING_TROPICAL_CYCLONE_2                           = 'CYCLONE2';
const MET_TYPE_ALERT_EARTHQUAKE_TSUNAMI_2                           = 'QUAKETSUNAMI2';
const MET_TYPE_WARNING_THUNDERSTORM_2                               = 'THUNDERSTORM2';
const MET_TYPE_HOURLY_OBSERVATION_RAIN_1HR                          = 'RAIN_1HR';
const MET_TYPE_HOURLY_OBSERVATION_TEMPERATURE                       = 'TEMP';
const MET_TYPE_HOURLY_OBSERVATION_RELATIVE_HUMIDITY                 = 'RH';
const MET_TYPE_HOURLY_OBSERVATION_WIND_DIRECTION                    = 'WND_DIR';
const MET_TYPE_HOURLY_OBSERVATION_WIND_SPEED                        = 'WND_SPD';
const MET_TYPE_HOURLY_OBSERVATION_VISIBILITY                        = 'VIS';
const MET_TYPE_HOURLY_OBSERVATION_PRESENT_WEATHER_ID                = 'PRST_WX_ID';
const MET_TYPE_OBSERVATION_RAINS_MAX_TEMPERATURE                    = 'RMAXT';
const MET_TYPE_WARNING_THUNDERSTORM                                 = 'THUNDERSTORM';
const MET_TYPE_WARNING_HEAVY_RAIN_2                                 = 'RAIN2';
const MET_TYPE_OBSERVATION_RAINS                                    = 'RAINS';
const MET_TYPE_OBSERVATION_RAINS_10M                                = 'RAINS10m';
const MET_TYPE_OBSERVATION_RAINS_20M                                = 'RAINS20m';
const MET_TYPE_OBSERVATION_RAINS_30M                                = 'RAINS30m';
const MET_TYPE_OBSERVATION_RAINS_40M                                = 'RAINS40m';
const MET_TYPE_OBSERVATION_RAINS_50M                                = 'RAINS50m';
const MET_TYPE_OBSERVATION_RAINS_60M                                = 'RAINS60m';
const MET_TYPE_OBSERVATION_RAINS_70M                                = 'RAINS70m';
const MET_TYPE_OBSERVATION_RAINS_80M                                = 'RAINS80m';
const MET_TYPE_OBSERVATION_RAINS_90M                                = 'RAINS90m';
const MET_TYPE_OBSERVATION_RAINS_100M                               = 'RAINS100m';
const MET_TYPE_OBSERVATION_RAINS_110M                               = 'RAINS110m';
const MET_TYPE_OBSERVATION_RAINS_120M                               = 'RAINS120m';

exports.weather = async (msgText) => {
    try {
        log.warn('[weather] ' + __filename, 'msgText - ' + msgText);
        let url = 'https://api.met.gov.my/v2.1/data?';
        let cmd = msgText.split(' ');
        let date = common.getDate();
        let data = {};

        /**
         * Got the callback value from MET, now need to fix the location name by another split method
         * TODO: Fix Location name, restructure callback value and compile to human readable message
         */

        switch (cmd[1]) {
            case 'weather':
                var locationName = (cmd[3] == undefined || cmd[3] == null) ? cmd[2] : cmd[2] + ' ' + cmd[3];
                locationName = locationName.toUpperCase();

                data = {
                    'datasetid': MET_SET_ID_WEATHER,
                    'datacategoryid': MET_CAT_ID_GENERAL,
                    'locationid': getLocationDetails(locationName).id,
                    'start_date': date,
                    'end_date': date,
                    'lang': 'en'
                };
                break;
    
            default:
                break;
        }
        let response = await api.getWeather(url, data);
        log.warn('[weather] ' + __filename, 'response ' + JSON.stringify(response));

        let metaData = response.metadata.resultset;
        let results = response.results;

        if (metaData.datasetid == MET_SET_ID_WEATHER && metaData.datacategoryid == MET_CAT_ID_GENERAL) {
            let morning     = 'Morning: ';
            let afternoon   = 'Afternoon: ';
            let night       = 'Night: ';
            let temperature = 'Min Max Temperature: ';
            let significant = 'Daily Significant Weather: ';
            let msg         = '*Weather - Forecase - General*\n';
            msg             += 'Location: *' + locationName + '*\n\n';

            log.warn('[weather]' + __filename, 'datasetid - FORECAST  datacategoryid - GENERAL');
            for (let i = 0; i < metaData.count; i++) {
                let value = results[i];
                switch (value.datatype) {
                    case MET_TYPE_FORECAST_GENERAL_DAILY_MORNING:
                        morning += '*' + value.value + '*';
                        break;
                
                    case MET_TYPE_FORECAST_GENERAL_DAILY_AFTERNOON:
                        afternoon += '*' + value.value + '*';
                        break;

                    case MET_TYPE_FORECAST_GENERAL_DAILY_NIGHT:
                        night += '*' + value.value + '*';
                        break;

                    case MET_TYPE_FORECAST_GENERAL_DAILY_MINIMUM_TEMPERATURE:
                        temperature += '*' + value.value + '* ~ ';
                        break;

                    case MET_TYPE_FORECAST_GENERAL_DAILY_MAXIMUM_TEMPERATURE:
                        temperature += '*' + value.value + '*';
                        break;

                    case MET_TYPE_FORECAST_GENERAL_DAILY_SIGNIFICANT_WEATHER:
                        significant += '*' + value.value + '*';                        
                        break;

                    default:
                        morning     = 'Undefined';
                        afternoon   = 'Undefined';
                        night       = 'Undefined';
                        temperature = 'Undefined';
                        significant = 'Undefined';
                        break;
                }
            }

            msg += significant + '\n\n' + morning + '\n' + afternoon + '\n' + night + '\n' + temperature;
            log.warn('[weather]' + __filename, 'return message - \n' + msg);
            return  msg;
        } else {
            return 'Undefined';
        }
    } catch (error) {
        log.error('[weather]' + __filename, 'error - ' + JSON.stringify(error));
        return await error;
    }
}

/**
 * This method is to get the location details provided by MET
 * @param {string} locationName user request location name by Malaysia Town name
 * @returns string - location id provided by MET 
 */
let getLocationDetails = (locationName) => {
    let locationObj = {
        "MUAR" : {
            "id": "LOCATION:127",
            "name": "MUAR",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:1",
            "latitude": 2.0442,
            "longitude": 102.5689
        },
        "TANGKAK" : {
            "id": "LOCATION:126",
            "name": "TANGKAK",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:1",
            "latitude": 2.2673,
            "longitude": 102.5453
        },
        "LABIS" : {
            "id": "LOCATION:125",
            "name": "LABIS",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:1",
            "latitude": 2.385,
            "longitude": 103.021
        },
        "JOHOR BAHRU" : {
            "id": "LOCATION:124",
            "name": "JOHOR BAHRU",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:1",
            "latitude": 1.4655,
            "longitude": 103.7578
        },
        "AYER HITAM" : {
            "id": "LOCATION:122",
            "name": "AYER HITAM",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:1",
            "latitude": 1.915,
            "longitude": 103.1808
        },
        "BATU PAHAT" : {
            "id": "LOCATION:123",
            "name": "BATU PAHAT",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:1",
            "latitude": 1.8548,
            "longitude": 102.9325
        },
        "MERSING" : {
            "id": "LOCATION:131",
            "name": "MERSING",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:1",
            "latitude": 2.4312,
            "longitude": 103.8405
        },
        "ISKANDAR PUTERI" : {
            "id": "LOCATION:659",
            "name": "ISKANDAR PUTERI",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:1",
            "latitude": 1.4135905,
            "longitude": 103.6317194
        },
        "KLUANG" : {
            "id": "LOCATION:129",
            "name": "KLUANG",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:1",
            "latitude": 2.0251,
            "longitude": 103.3328
        },
        "NUSAJAYA" : {
            "id": "LOCATION:768",
            "name": "NUSAJAYA",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:1",
            "latitude": 1.4239,
            "longitude": 103.6485
        },
        "KOTA TINGGI" : {
            "id": "LOCATION:130",
            "name": "KOTA TINGGI",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:1",
            "latitude": 1.7381,
            "longitude": 103.8999
        },
        "PONTIAN" : {
            "id": "LOCATION:134",
            "name": "PONTIAN",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:1",
            "latitude": 1.5,
            "longitude": 103.5
        },
        "SEGAMAT" : {
            "id": "LOCATION:135",
            "name": "SEGAMAT",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:1",
            "latitude": 2.5148,
            "longitude": 102.8158
        },
        "SENAI" : {
            "id": "LOCATION:136",
            "name": "SENAI",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:1",
            "latitude": 1.64131,
            "longitude": 103.66962
        },
        "SIMPANG RENGGAM" : {
            "id": "LOCATION:137",
            "name": "SIMPANG RENGGAM",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:1",
            "latitude": 1.825,
            "longitude": 103.3107
        },
        "YONG PENG" : {
            "id": "LOCATION:138",
            "name": "YONG PENG",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:1",
            "latitude": 2.0136,
            "longitude": 103.0659
        },
        "PASIR GUDANG" : {
            "id": "LOCATION:133",
            "name": "PASIR GUDANG",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:1",
            "latitude": 1.462,
            "longitude": 103.9053
        },
        "KULAI" : {
            "id": "LOCATION:439",
            "name": "KULAI",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:1",
            "latitude": 1.532949,
            "longitude": 103.6450341
        },
        "PAGOH" : {
            "id": "LOCATION:128",
            "name": "PAGOH",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:1",
            "latitude": 2.1495,
            "longitude": 102.7704
        },
        "SERDANG" : {
            "id": "LOCATION:426",
            "name": "SERDANG",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:2",
            "latitude": 5.2093299,
            "longitude": 100.6119237
        },
        "ALOR STAR" : {
            "id": "LOCATION:139",
            "name": "ALOR STAR",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:2",
            "latitude": 6.12104,
            "longitude": 100.36014
        },
        "BALING" : {
            "id": "LOCATION:140",
            "name": "BALING",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:2",
            "latitude": 5.67806,
            "longitude": 100.9177
        },
        "JITRA" : {
            "id": "LOCATION:141",
            "name": "JITRA",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:2",
            "latitude": 6.26812,
            "longitude": 100.42167
        },
        "KUALA NERANG" : {
            "id": "LOCATION:142",
            "name": "KUALA NERANG",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:2",
            "latitude": 6.25844,
            "longitude": 100.61264
        },
        "KULIM" : {
            "id": "LOCATION:143",
            "name": "KULIM",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:2",
            "latitude": 5.32403,
            "longitude": 100.60851
        },
        "PENDANG" : {
            "id": "LOCATION:145",
            "name": "PENDANG",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:2",
            "latitude": 5.98458,
            "longitude": 100.60732
        },
        "POKOK SENA" : {
            "id": "LOCATION:146",
            "name": "POKOK SENA",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:2",
            "latitude": 6.17055,
            "longitude": 100.51885
        },
        "SIK" : {
            "id": "LOCATION:147",
            "name": "SIK",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:2",
            "latitude": 6.03482,
            "longitude": 100.8603
        },
        "SUNGAI PETANI" : {
            "id": "LOCATION:148",
            "name": "SUNGAI PETANI",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:2",
            "latitude": 5.647,
            "longitude": 100.48772
        },
        "YAN" : {
            "id": "LOCATION:149",
            "name": "YAN",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:2",
            "latitude": 5.7905,
            "longitude": 100.39426
        },
        "KUALA KRAI" : {
            "id": "LOCATION:154",
            "name": "KUALA KRAI",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:3",
            "latitude": 5.5313,
            "longitude": 102.19925
        },
        "LOJING" : {
            "id": "LOCATION:155",
            "name": "LOJING",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:3",
            "latitude": 4.7046137,
            "longitude": 101.5553148
        },
        "MACHANG" : {
            "id": "LOCATION:156",
            "name": "MACHANG",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:3",
            "latitude": 5.76407,
            "longitude": 102.21414
        },
        "PASIR PUTEH" : {
            "id": "LOCATION:158",
            "name": "PASIR PUTEH",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:3",
            "latitude": 5.83333,
            "longitude": 102.4
        },
        "TANAH MERAH" : {
            "id": "LOCATION:160",
            "name": "TANAH MERAH",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:3",
            "latitude": 5.66667,
            "longitude": 102.0
        },
        "TUMPAT" : {
            "id": "LOCATION:161",
            "name": "TUMPAT",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:3",
            "latitude": 6.19776,
            "longitude": 102.17098
        },
        "KOTA BHARU" : {
            "id": "LOCATION:153",
            "name": "KOTA BHARU",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:3",
            "latitude": 6.05666,
            "longitude": 102.26451
        },
        "JELI" : {
            "id": "LOCATION:152",
            "name": "JELI",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:3",
            "latitude": 5.71493,
            "longitude": 101.88418
        },
        "GUA MUSANG" : {
            "id": "LOCATION:151",
            "name": "GUA MUSANG",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:3",
            "latitude": 4.8823,
            "longitude": 101.9644
        },
        "BACHOK" : {
            "id": "LOCATION:150",
            "name": "BACHOK",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:3",
            "latitude": 6.06667,
            "longitude": 102.4
        },
        "RANTAU PANJANG" : {
            "id": "LOCATION:159",
            "name": "RANTAU PANJANG",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:3",
            "latitude": 6.021325,
            "longitude": 101.9732687
        },
        "PASIR MAS" : {
            "id": "LOCATION:157",
            "name": "PASIR MAS",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:3",
            "latitude": 6.0424976,
            "longitude": 102.1427782
        },
        "LOCATION" : {
            "id": "LOCATION:169",
            "name": "SETAPAK",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:4",
            "latitude": 3.18333,
            "longitude": 101.7
        },
        "KUALA LUMPUR" : {
            "id": "LOCATION:340",
            "name": "KUALA LUMPUR",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:4",
            "latitude": 3.1429996,
            "longitude": 101.6947998
        },
        "AMPANG" : {
            "id": "LOCATION:162",
            "name": "AMPANG",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:4",
            "latitude": 3.15,
            "longitude": 101.76667
        },
        "BANGSAR" : {
            "id": "LOCATION:163",
            "name": "BANGSAR",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:4",
            "latitude": 3.12222,
            "longitude": 101.67606
        },
        "BUKIT BINTANG" : {
            "id": "LOCATION:164",
            "name": "BUKIT BINTANG",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:4",
            "latitude": 5.63052,
            "longitude": 102.6479
        },
        "CHERAS" : {
            "id": "LOCATION:165",
            "name": "CHERAS",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:4",
            "latitude": 3.05,
            "longitude": 101.76667
        },
        "JALAN DUTA" : {
            "id": "LOCATION:166",
            "name": "JALAN DUTA",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:4",
            "latitude": 3.1484,
            "longitude": 101.6779
        },
        "KEPONG" : {
            "id": "LOCATION:167",
            "name": "KEPONG",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:4",
            "latitude": 3.21667,
            "longitude": 101.63333
        },
        "SELAYANG" : {
            "id": "LOCATION:168",
            "name": "SELAYANG",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:4",
            "latitude": 3.23581,
            "longitude": 101.66958
        },
        "SUNGAI BESI" : {
            "id": "LOCATION:170",
            "name": "SUNGAI BESI",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:4",
            "latitude": 3.05,
            "longitude": 101.7
        },
        "TANGGA BATU" : {
            "id": "LOCATION:179",
            "name": "TANGGA BATU",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:6",
            "latitude": 2.2601,
            "longitude": 102.1523
        },
        "MELAKA CITY" : {
            "id": "LOCATION:766",
            "name": "MELAKA CITY",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:6",
            "latitude": null,
            "longitude": null
        },
        "ALOR GAJAH" : {
            "id": "LOCATION:172",
            "name": "ALOR GAJAH",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:6",
            "latitude": 2.3804,
            "longitude": 102.2089
        },
        "AYER KEROH" : {
            "id": "LOCATION:173",
            "name": "AYER KEROH",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:6",
            "latitude": 2.25368,
            "longitude": 102.25044
        },
        "BANDARAYA MELAKA" : {
            "id": "LOCATION:174",
            "name": "BANDARAYA MELAKA",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:6",
            "latitude": 2.196,
            "longitude": 102.2405
        },
        "DURIAN TUNGGAL" : {
            "id": "LOCATION:175",
            "name": "DURIAN TUNGGAL",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:6",
            "latitude": 2.3125,
            "longitude": 102.2805
        },
        "JASIN" : {
            "id": "LOCATION:176",
            "name": "JASIN",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:6",
            "latitude": 2.3096,
            "longitude": 102.4281
        },
        "MASJID TANAH" : {
            "id": "LOCATION:177",
            "name": "MASJID TANAH",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:6",
            "latitude": 2.3585,
            "longitude": 102.1029
        },
        "MERLIMAU" : {
            "id": "LOCATION:178",
            "name": "MERLIMAU",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:6",
            "latitude": 2.1449,
            "longitude": 102.4251
        },
        "SEREMBAN" : {
            "id": "LOCATION:188",
            "name": "SEREMBAN",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:7",
            "latitude": 2.7297,
            "longitude": 101.9381
        },
        "TAMPIN" : {
            "id": "LOCATION:189",
            "name": "TAMPIN",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:7",
            "latitude": 2.4701,
            "longitude": 102.2302
        },
        "PDSA ENSTEK" : {
            "id": "LOCATION:781",
            "name": "PDSA ENSTEK",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:7",
            "latitude": 2.72561,
            "longitude": 101.79606
        },
        "GEMAS" : {
            "id": "LOCATION:180",
            "name": "GEMAS",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:7",
            "latitude": 2.5832,
            "longitude": 102.6117
        },
        "JELEBU" : {
            "id": "LOCATION:181",
            "name": "JELEBU",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:7",
            "latitude": 2.8654,
            "longitude": 101.9137
        },
        "JEMPOL" : {
            "id": "LOCATION:182",
            "name": "JEMPOL",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:7",
            "latitude": 2.8026,
            "longitude": 102.3682
        },
        "KUALA KLAWANG" : {
            "id": "LOCATION:183",
            "name": "KUALA KLAWANG",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:7",
            "latitude": 2.9395,
            "longitude": 102.0704
        },
        "KUALA PILAH" : {
            "id": "LOCATION:184",
            "name": "KUALA PILAH",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:7",
            "latitude": 2.7389,
            "longitude": 102.2487
        },
        "NILAI" : {
            "id": "LOCATION:185",
            "name": "NILAI",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:7",
            "latitude": 2.8255,
            "longitude": 101.8111
        },
        "PORT DICKSON" : {
            "id": "LOCATION:186",
            "name": "PORT DICKSON",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:7",
            "latitude": 2.5228,
            "longitude": 101.7959
        },
        "REMBAU" : {
            "id": "LOCATION:187",
            "name": "REMBAU",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:7",
            "latitude": 2.5897,
            "longitude": 102.0913
        },
        "PEKAN" : {
            "id": "LOCATION:199",
            "name": "PEKAN",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:8",
            "latitude": 3.4836,
            "longitude": 103.3996
        },
        "RAUB" : {
            "id": "LOCATION:200",
            "name": "RAUB",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:8",
            "latitude": 3.88333,
            "longitude": 101.83333
        },
        "TEMERLOH" : {
            "id": "LOCATION:201",
            "name": "TEMERLOH",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:8",
            "latitude": 3.4506,
            "longitude": 102.4176
        },
        "TRIANG" : {
            "id": "LOCATION:202",
            "name": "TRIANG",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:8",
            "latitude": 3.2462,
            "longitude": 102.4155
        },
        "TRIANG" : {
            "id": "LOCATION:198",
            "name": "MUADZAM SHAH",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:8",
            "latitude": 3.0627,
            "longitude": 103.0892
        },
        "MENTAKAB" : {
            "id": "LOCATION:197",
            "name": "MENTAKAB",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:8",
            "latitude": 3.4854,
            "longitude": 102.3484
        },
        "MARAN" : {
            "id": "LOCATION:196",
            "name": "MARAN",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:8",
            "latitude": 3.586,
            "longitude": 102.773
        },
        "KUALA ROMPIN" : {
            "id": "LOCATION:195",
            "name": "KUALA ROMPIN",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:8",
            "latitude": 2.81667,
            "longitude": 103.48333
        },
        "KUALA LIPIS" : {
            "id": "LOCATION:194",
            "name": "KUALA LIPIS",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:8",
            "latitude": 4.1842,
            "longitude": 102.0468
        },
        "KUANTAN" : {
            "id": "LOCATION:193",
            "name": "KUANTAN",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:8",
            "latitude": 3.8077,
            "longitude": 103.326
        },
        "JERANTUT" : {
            "id": "LOCATION:192",
            "name": "JERANTUT",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:8",
            "latitude": 3.936,
            "longitude": 102.3626
        },
        "BERA" : {
            "id": "LOCATION:191",
            "name": "BERA",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:8",
            "latitude": 3.33333,
            "longitude": 102.5
        },
        "BATU EMBUN" : {
            "id": "LOCATION:773",
            "name": "BATU EMBUN",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:8",
            "latitude": 3.9707,
            "longitude": 102.3479
        },
        "BENTONG" : {
            "id": "LOCATION:190",
            "name": "BENTONG",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:8",
            "latitude": 3.51667,
            "longitude": 101.9
        },
        "BALIK PULAU" : {
            "id": "LOCATION:204",
            "name": "BALIK PULAU",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:9",
            "latitude": 5.34916,
            "longitude": 100.23938
        },
        "AYER ITAM" : {
            "id": "LOCATION:203",
            "name": "AYER ITAM",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:9",
            "latitude": 5.4,
            "longitude": 100.28333
        },
        "BAYAN LEPAS" : {
            "id": "LOCATION:205",
            "name": "BAYAN LEPAS",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:9",
            "latitude": 5.29992,
            "longitude": 100.26052
        },
        "BATU KAWAN" : {
            "id": "LOCATION:206",
            "name": "BATU KAWAN",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:9",
            "latitude": 2.2672,
            "longitude": 102.1149
        },
        "BUTTERWORTH" : {
            "id": "LOCATION:207",
            "name": "BUTTERWORTH",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:9",
            "latitude": 5.3991,
            "longitude": 100.36382
        },
        "BUKIT MERTAJAM" : {
            "id": "LOCATION:208",
            "name": "BUKIT MERTAJAM",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:9",
            "latitude": 5.36301,
            "longitude": 100.4667
        },
        "BUKIT TENGAH" : {
            "id": "LOCATION:209",
            "name": "BUKIT TENGAH",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:9",
            "latitude": 5.35064,
            "longitude": 100.43042
        },
        "GEORGETOWN" : {
            "id": "LOCATION:210",
            "name": "GEORGETOWN",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:9",
            "latitude": 5.41123,
            "longitude": 100.33543
        },
        "KEPALA BATAS" : {
            "id": "LOCATION:211",
            "name": "KEPALA BATAS",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:9",
            "latitude": 5.51707,
            "longitude": 100.4265
        },
        "NIBONG TEBAL" : {
            "id": "LOCATION:212",
            "name": "NIBONG TEBAL",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:9",
            "latitude": 5.16586,
            "longitude": 100.47793
        },
        "PERAI" : {
            "id": "LOCATION:213",
            "name": "PERAI",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:9",
            "latitude": 5.38333,
            "longitude": 100.38333
        },
        "PRAI" : {
            "id": "LOCATION:775",
            "name": "PRAI",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:9",
            "latitude": 5.3534,
            "longitude": 100.4053
        },
        "SLIM RIVER" : {
            "id": "LOCATION:231",
            "name": "SLIM RIVER",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:10",
            "latitude": 3.83333,
            "longitude": 101.4
        },
        "SITIAWAN" : {
            "id": "LOCATION:226",
            "name": "SITIAWAN",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:10",
            "latitude": 4.2168,
            "longitude": 100.6996
        },
        "BATU GAJAH" : {
            "id": "LOCATION:216",
            "name": "BATU GAJAH",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:10",
            "latitude": 4.46916,
            "longitude": 101.04107
        },
        "BAGAN SERAI" : {
            "id": "LOCATION:215",
            "name": "BAGAN SERAI",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:10",
            "latitude": 5.0108,
            "longitude": 100.54101
        },
        "SUNGAI SIPUT" : {
            "id": "LOCATION:225",
            "name": "SUNGAI SIPUT",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:10",
            "latitude": 4.3945,
            "longitude": 101.1947
        },
        "TAIPING" : {
            "id": "LOCATION:227",
            "name": "TAIPING",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:10",
            "latitude": 4.85,
            "longitude": 100.73333
        },
        "SELAMA" : {
            "id": "LOCATION:224",
            "name": "SELAMA",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:10",
            "latitude": 5.2236,
            "longitude": 100.69262
        },
        "PARIT BUNTAR" : {
            "id": "LOCATION:223",
            "name": "PARIT BUNTAR",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:10",
            "latitude": 5.12671,
            "longitude": 100.49316
        },
        "LENGGONG" : {
            "id": "LOCATION:222",
            "name": "LENGGONG",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:10",
            "latitude": 5.10633,
            "longitude": 100.96792
        },
        "KUALA KANGSAR" : {
            "id": "LOCATION:221",
            "name": "KUALA KANGSAR",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:10",
            "latitude": 4.76667,
            "longitude": 100.93333
        },
        "BAGAN DATUK" : {
            "id": "LOCATION:434",
            "name": "BAGAN DATUK",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:10",
            "latitude": 3.989949,
            "longitude": 100.785137
        },
        "GERIK" : {
            "id": "LOCATION:217",
            "name": "GERIK",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:10",
            "latitude": 5.41667,
            "longitude": 101.13333
        },
        "KAMPAR" : {
            "id": "LOCATION:220",
            "name": "KAMPAR",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:10",
            "latitude": 4.3,
            "longitude": 101.15
        },
        "TAPAH" : {
            "id": "LOCATION:228",
            "name": "TAPAH",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:10",
            "latitude": 4.18333,
            "longitude": 101.26667
        },
        "SERI ISKANDAR" : {
            "id": "LOCATION:431",
            "name": "SERI ISKANDAR",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:10",
            "latitude": 4.3519013,
            "longitude": 100.9782762
        },
        "IPOH" : {
            "id": "LOCATION:219",
            "name": "IPOH",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:10",
            "latitude": 4.5841,
            "longitude": 101.0829
        },
        "LUBOK MERBAU" : {
            "id": "LOCATION:774",
            "name": "LUBOK MERBAU",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:10",
            "latitude": 4.795,
            "longitude": 100.896
        },
        "TELUK INTAN" : {
            "id": "LOCATION:230",
            "name": "TELUK INTAN",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:10",
            "latitude": 4.0259,
            "longitude": 101.0213
        },
        "GOPENG" : {
            "id": "LOCATION:218",
            "name": "GOPENG",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:10",
            "latitude": 4.4715,
            "longitude": 101.1663
        },
        "PADANG BESAR" : {
            "id": "LOCATION:780",
            "name": "PADANG BESAR",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:11",
            "latitude": 6.6624,
            "longitude": 100.3211
        },
        "PERLIS" : {
            "id": "LOCATION:753",
            "name": "PERLIS",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:11",
            "latitude": 6.4407,
            "longitude": 100.1979
        },
        "PUTRAJAYA" : {
            "id": "LOCATION:237",
            "name": "PUTRAJAYA",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:12",
            "latitude": 2.91667,
            "longitude": 101.7
        },
        "KASA" : {
            "id": "LOCATION:772",
            "name": "KASA",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:12",
            "latitude": 2.94569,
            "longitude": 101.70874
        },
        "TAMAN NEGARA GUNUNG MULU" : {
            "id": "LOCATION:770",
            "name": "TAMAN NEGARA GUNUNG MULU",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:14",
            "latitude": 4.09,
            "longitude": 114.89
        },
        "TAMAN NEGARA NIAH" : {
            "id": "LOCATION:771",
            "name": "TAMAN NEGARA NIAH",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:14",
            "latitude": 3.8,
            "longitude": 113.78
        },
        "MULU" : {
            "id": "LOCATION:776",
            "name": "MULU",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:14",
            "latitude": 4.0484,
            "longitude": 114.8099
        },
        "SERI KEMBANGAN" : {
            "id": "LOCATION:299",
            "name": "SERI KEMBANGAN",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:15",
            "latitude": 3.03333,
            "longitude": 101.71667
        },
        "BANGI" : {
            "id": "LOCATION:283",
            "name": "BANGI",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:15",
            "latitude": 2.9,
            "longitude": 101.78333
        },
        "BANTING" : {
            "id": "LOCATION:284",
            "name": "BANTING",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:15",
            "latitude": 2.8136,
            "longitude": 101.50185
        },
        "BATU CAVES" : {
            "id": "LOCATION:285",
            "name": "BATU CAVES",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:15",
            "latitude": 3.23333,
            "longitude": 101.7
        },
        "CYBERJAYA" : {
            "id": "LOCATION:286",
            "name": "CYBERJAYA",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:15",
            "latitude": 2.92281,
            "longitude": 101.65718
        },
        "DAMANSARA" : {
            "id": "LOCATION:287",
            "name": "DAMANSARA",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:15",
            "latitude": 3.13333,
            "longitude": 101.63333
        },
        "KAJANG" : {
            "id": "LOCATION:288",
            "name": "KAJANG",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:15",
            "latitude": 2.9927,
            "longitude": 101.7909
        },
        "KUALA KUBU BHARU" : {
            "id": "LOCATION:289",
            "name": "KUALA KUBU BHARU",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:15",
            "latitude": 3.5638,
            "longitude": 101.6581
        },
        "KUALA SELANGOR" : {
            "id": "LOCATION:290",
            "name": "KUALA SELANGOR",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:15",
            "latitude": 3.33333,
            "longitude": 101.25
        },
        "RAWANG" : {
            "id": "LOCATION:291",
            "name": "RAWANG",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:15",
            "latitude": 3.3213,
            "longitude": 101.5767
        },
        "PETALING JAYA" : {
            "id": "LOCATION:293",
            "name": "PETALING JAYA",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:15",
            "latitude": 3.10726,
            "longitude": 101.60671
        },
        "SABAK BERNAM" : {
            "id": "LOCATION:294",
            "name": "SABAK BERNAM",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:15",
            "latitude": 3.58333,
            "longitude": 101.11667
        },
        "SHAH ALAM" : {
            "id": "LOCATION:295",
            "name": "SHAH ALAM",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:15",
            "latitude": 3.08507,
            "longitude": 101.53281
        },
        "SEMENYIH" : {
            "id": "LOCATION:296",
            "name": "SEMENYIH",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:15",
            "latitude": 2.9516,
            "longitude": 101.843
        },
        "SENTUL" : {
            "id": "LOCATION:297",
            "name": "SENTUL",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:15",
            "latitude": 3.18333,
            "longitude": 101.68333
        },
        "SEPANG" : {
            "id": "LOCATION:298",
            "name": "SEPANG",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:15",
            "latitude": 2.75,
            "longitude": 101.66667
        },
        "SUBANG JAYA" : {
            "id": "LOCATION:300",
            "name": "SUBANG JAYA",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:15",
            "latitude": 3.04384,
            "longitude": 101.58062
        },
        "PELABUHAN KLANG" : {
            "id": "LOCATION:537",
            "name": "PELABUHAN KLANG",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:15",
            "latitude": 3.0430916,
            "longitude": 101.4413921
        },
        "PORT KLANG" : {
            "id": "LOCATION:764",
            "name": "PORT KLANG",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:15",
            "latitude": null,
            "longitude": null
        },
        "KFC TAMAN SRI MUDA SHAH ALAM" : {
            "id": "LOCATION:782",
            "name": "KFC TAMAN SRI MUDA SHAH ALAM",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:15",
            "latitude": 3.02205,
            "longitude": 101.53968
        },
        "SETIU" : {
            "id": "LOCATION:309",
            "name": "SETIU",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:16",
            "latitude": 5.55008,
            "longitude": 102.73551
        },
        "PAKA" : {
            "id": "LOCATION:308",
            "name": "PAKA",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:16",
            "latitude": 4.6374,
            "longitude": 103.4368
        },
        "KUALA TERENGGANU" : {
            "id": "LOCATION:307",
            "name": "KUALA TERENGGANU",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:16",
            "latitude": 5.3302,
            "longitude": 103.1408
        },
        "KERTIH" : {
            "id": "LOCATION:306",
            "name": "KERTIH",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:16",
            "latitude": 4.5141,
            "longitude": 103.4483
        },
        "KEMAMAN" : {
            "id": "LOCATION:305",
            "name": "KEMAMAN",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:16",
            "latitude": 4.21667,
            "longitude": 103.2
        },
        "BANDAR PERMAISURI" : {
            "id": "LOCATION:301",
            "name": "BANDAR PERMAISURI",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:16",
            "latitude": 5.52241,
            "longitude": 102.74854
        },
        "JERTEH" : {
            "id": "LOCATION:304",
            "name": "JERTEH",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:16",
            "latitude": 5.7336,
            "longitude": 102.4897
        },
        "KERTEH" : {
            "id": "LOCATION:777",
            "name": "KERTEH",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:16",
            "latitude": 4.5409,
            "longitude": 103.4286
        },
        "DUNGUN" : {
            "id": "LOCATION:303",
            "name": "DUNGUN",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:16",
            "latitude": 4.775,
            "longitude": 103.4162
        },
        "BESUT" : {
            "id": "LOCATION:302",
            "name": "BESUT",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:16",
            "latitude": 5.57107,
            "longitude": 102.51911
        },
        "KUALA NERUS" : {
            "id": "LOCATION:437",
            "name": "KUALA NERUS",
            "locationcategoryid": "TOWN",
            "locationrootid": "LOCATION:16",
            "latitude": 5.3776776,
            "longitude": 103.0636803
        }
    };
    return locationObj[locationName];
}