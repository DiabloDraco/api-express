export default async (req, res, next) => {
  try {
      await fetch(
        "https://new.expert.uz/services/platon-core/web/public/check/token?user_token=" +
          req.query.token +
          "&user_id=" +
          req.query.user_id,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.data.check == true) {
            return next();
          } else {
            res.status(401).json({ status: 401, message: "Unauthorized user" });
          }
        });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};
