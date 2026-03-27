const apiOnly = (req, res, next) => {
  const accept = req.headers.accept || ""

  if (!accept.includes("application/json")) {
    return res.status(403).json({
      message: "Direct browser access is not allowed"
    })
  }

  next()
}

export default apiOnly
