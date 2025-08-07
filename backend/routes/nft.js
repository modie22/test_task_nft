const express = require('express');
const router = express.Router();
const multer = require('multer');
const NFT = require('../models/Nft.model');

// Storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// GET all NFTs
router.get('/', async (req, res) => {
  try {
    const nfts = await NFT.find().sort({ createdAt: -1 });
    res.json(nfts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch NFTs' });
  }
});

// POST 
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newNFT = new NFT({
      title,
      description,
      price,
      imageUrl
    });

    await newNFT.save();
    res.status(201).json(newNFT);
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload NFT' });
  }
});

// DELETE 
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNft = await NFT.findByIdAndDelete(id);

    if (!deletedNft) {
      return res.status(404).json({ error: 'NFT not found' });
    }

    res.json({ message: 'NFT deleted successfully', deletedNft });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete NFT' });
  }
});

module.exports = router;
