const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: ["jewelry", "clothing", "home-decor", "art", "accessories", "other"],
    },
    images: {
      type: [String],
      default: [],
    },
    artisanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Artisan ID is required"],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Virtual for reviews
productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "productId",
})

// Add average rating virtual
productSchema.virtual("averageRating").get(function () {
  if (this.reviews && this.reviews.length > 0) {
    const sum = this.reviews.reduce((total, review) => total + review.rating, 0)
    return (sum / this.reviews.length).toFixed(1)
  }
  return 0
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product

