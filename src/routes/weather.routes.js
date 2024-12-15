import { Router } from "express";
import { getWeatherData } from "../controllers/weather.controllers.js";

const router = Router();

router.get("/weather", getWeatherData);

export default router;
