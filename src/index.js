import dotenv from "dotenv";
import app from "./app.js";
import weatherRoute from "./routes/weather.routes.js";

dotenv.config({
    path: "./.env",
});

const port = process.env.APP_PORT || 8000;

app.use(weatherRoute);

app.listen(port, () => {
    console.log(`App is listing at port ${port}`);
});
