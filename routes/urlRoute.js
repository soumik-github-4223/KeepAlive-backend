const express = require('express');
const router = express.Router();
const Url = require('../models/Url');

// GET all URLs
router.get('/', async (req, res) => {
  const urls = await Url.find({}, { password: 0 }); // hide password
  res.json(urls);
});

// POST new URL
router.post('/', async (req, res) => {
  const { url, password } = req.body;
  if (!url || !password) return res.status(400).json({ error: 'Missing fields' });

  const exists = await Url.findOne({ url });
  if (exists) return res.status(400).json({ error: 'URL already added' });

  const newUrl = new Url({ url, password });
  await newUrl.save();
  res.json({ message: 'URL added' });
});

// DELETE URL with password
router.delete('/delete', async (req, res) => {
  const { url, password } = req.body;
  const found = await Url.findOne({ url, password });
  if (!found) return res.status(401).json({ error: 'Invalid URL or password' });

  await Url.deleteOne({ url });
  res.json({ message: 'URL deleted' });
});

module.exports = router;
