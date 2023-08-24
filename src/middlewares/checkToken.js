export default async (req, res, next) => {
    try {
        let res = await fetch('https://api.expert.uz/api/public/check/token?user_token=' + req.query.token, {
            method: "GET"
        })
        if (res.data.data == true) {
            return next()
        } else {
            res.status(401).json({ status: 401, message: 'Unauthorized user' })
        }
    } catch (error) { res.status(400).json({ status: 400, message: error.message }) }
}