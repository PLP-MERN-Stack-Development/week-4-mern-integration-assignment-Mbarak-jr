const HeroSection = require('../models/HeroSection');

// Get all active hero sections for rotation
exports.getActiveHeroSections = async (req, res) => {
  try {
    const heroSections = await HeroSection.find({ isActive: true }).sort({ displayOrder: 1 });
    res.json(heroSections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new hero section
exports.createHeroSection = async (req, res) => {
  try {
    const heroSection = new HeroSection(req.body);
    const savedHeroSection = await heroSection.save();
    res.status(201).json(savedHeroSection);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update hero section
exports.updateHeroSection = async (req, res) => {
  try {
    const updatedHeroSection = await HeroSection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedHeroSection) {
      return res.status(404).json({ message: 'Hero section not found' });
    }
    res.json(updatedHeroSection);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete hero section
exports.deleteHeroSection = async (req, res) => {
  try {
    const deletedHeroSection = await HeroSection.findByIdAndDelete(req.params.id);
    if (!deletedHeroSection) {
      return res.status(404).json({ message: 'Hero section not found' });
    }
    res.json({ message: 'Hero section deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};