const mongoose = require('mongoose');

const HeroSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  highlightedText: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  primaryButtonText: {
    type: String,
    required: true
  },
  primaryButtonLink: {
    type: String,
    required: true
  },
  secondaryButtonText: {
    type: String,
    required: true
  },
  secondaryButtonLink: {
    type: String,
    required: true
  },
  colorScheme: {
    gradientFrom: {
      type: String,
      default: 'slate-900'
    },
    gradientVia: {
      type: String,
      default: 'gray-800'
    },
    gradientTo: {
      type: String,
      default: 'slate-700'
    },
    highlightFrom: {
      type: String,
      default: 'amber-400'
    },
    highlightTo: {
      type: String,
      default: 'pink-400'
    },
    primaryButtonColor: {
      type: String,
      default: 'amber-500'
    },
    primaryButtonHover: {
      type: String,
      default: 'amber-600'
    },
    secondaryButtonBorder: {
      type: String,
      default: 'amber-400'
    },
    secondaryButtonText: {
      type: String,
      default: 'amber-400'
    },
    secondaryButtonHoverBg: {
      type: String,
      default: 'amber-400'
    },
    secondaryButtonHoverText: {
      type: String,
      default: 'slate-900'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('HeroSection', HeroSectionSchema);