import { getCityData } from "../utlis/weather.utlis.js";

const getWeatherData = async (request, response) => {
    const { city } = request.query;
    if (!city) {
        return response.status(400).json({
            statusCode: 400,
            message: "Provide City as a parameter",
        });
    }
    let data = await getCityData(city);

    if (data.status) {
        return response.status(200).json({
            statusCode: 200,
            data: data,
            message: "Data send successfully",
        });
    } else {
        return response.status(400).json({
            statusCode: 400,
            data: data,
            message: "Something went wrong",
        });
    }
};

export { getWeatherData };
