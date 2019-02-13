let admin = (req,resp,next) => {

    if (req.user.role === 0) {
        return resp.send('User not assigned admin role.')

    }
    next();
}

module.exports = { admin }