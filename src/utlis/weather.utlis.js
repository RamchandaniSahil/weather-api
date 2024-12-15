import client from "../configs/connect.js";
import axios from "axios";

// TODO: store the data in catch and check catch function is remaining in these project and check once again if any thing is remaining or not?

const storeDataInCatch = async (key, value) => {
    key = key.trim().toLowerCase();
    await client.set(key, JSON.stringify(value), {
        NX: true,
        EX: 60 * 60 * 24,
    });
};

const checkCatch = async (key) => {
    key = key.trim().toLowerCase();
    let data = client.get(key).then((result) => {
        return result;
    });
};

const getCityData = async (city) => {
    let result = await checkCatch(city);
    if (!result) {
        result = await makeApiCall(city);
    }
    return result;
};

const makeApiCall = async (city) => {
    let weatherApiKey = process.env.WEATHER_API_KEY;
    let weatherUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${weatherApiKey}`;
    try {
        let result = await axios.get(weatherUrl);
        storeDataInCatch(city, result.data);
        return {
            status: true,
            data: result.data,
        };
    } catch (error) {
        return {
            status: false,
            data: error,
        };
    }
};

export { getCityData };
