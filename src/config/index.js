import router from "../router";
import { cors } from "../middlewares";

export default (app) => {
  return (logger, { urlencoded, json }) => {
    app.use(urlencoded({
      extended: false
    }));
    app.use(json());
    app.use(logger("dev"));
    app.use(cors("*"));
    app.get("/", (req, res) => {
     res.status(200).json({
      message: "Welcome to the homepage"
     });
    });
    app.get("/info", (req, res) => {
     res.status(200).json({
      path: req.path,
      url: req.url,
      status: res.statusText
     });
    });
    app.get("/health", (req, res) => {
     res.status(200).json({
      status: "HEALTHY"
     });
    });
    app.use("/api/v1", router);
  };
};
