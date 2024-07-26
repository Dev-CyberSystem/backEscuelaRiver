import moment from "moment-timezone";

export const formatDateMiddleware = (req, res, next) => {
  if (req.body.fecha) {
    req.body.fecha = moment(req.body.fecha, "DD-MM-YYYY")
      .tz("America/Argentina/Buenos_Aires")
      .format("YYYY-MM-DD");
  }
  next();
};
