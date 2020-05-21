import router from "../router";

export default (app) => {
  return (logger, { urlencoded, json }) => {
    app.use(urlencoded({
      extended: false
    }));
    app.use(json());
    app.use(logger("dev"));
    app.use("/api/v1", router);
  };
};
