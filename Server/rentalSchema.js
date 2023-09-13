const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  name: String,
  location: {
    latitude: Number,
    longitude: Number,
    residence: String,
  },
  thumbnailImage: String,
  photos: [{
    image: String,
    links: {
      link1: String,
      link2: String,
    },
    src: {
      id: String,
      name: String,
    },
  }],
  information: {
    amenities: {
      wifi: Boolean,
      water: Boolean,
      security: Boolean,
    },
    rules: [String],
    pricing: {
      price: String,
      rentDueDate: String,
      fineIfRentExceeded: String,
    },
    details: {
      agency: String,
      contact: {
        email: String,
        phone: String,
      },
      agencyLink: String,
    },
    houseCategory: String,
    vacant: Boolean,
    numberOfHousesVacant: Number,
  },
  userReviews: {
    rating: Number,
    usersRated: Number,
    likes: Number,
    grading: String,
    stars: Number,
    reviews: [{
      reviewMessage: String,
      date: String,
      userRating: String,
    }],
    Views: Number,
    totalReviews: Number,
  },
});

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;
