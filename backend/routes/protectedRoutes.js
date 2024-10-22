const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/user-profile', auth, (req, res) => {
  // The auth middleware will ensure that only authenticated users can access this route
  res.json({ message: "This is a protected route", userId: req.userId });
});

module.exports = router;