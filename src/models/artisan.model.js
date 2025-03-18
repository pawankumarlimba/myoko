const mongoose = require('mongoose');

const ArtisanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    profileImage: { type: String, required: true },
    shortBio: { type: String, required: true },
    fullBio: { type: String, required: true },
    location: {
      village: { type: String },
      district: { type: String },
      state: { type: String },
    },
    yearsOfExperience: { type: Number },
    familyTradition: { type: String },
    craftDetails: [
      {
        name: { type: String },
        description: { type: String },
        culturalSignificance: { type: String },
        materials: [{ type: String }],
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports =
  mongoose.models.Artisan || mongoose.model('Artisan', ArtisanSchema);
