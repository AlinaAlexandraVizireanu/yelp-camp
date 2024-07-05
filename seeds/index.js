const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      /// My user ID
      author: "665b2bb8e2c324f4d303435c",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ipsum beatae iure, animi officia esse provident corrupti illo in excepturi voluptatem sapiente laborum ipsa, eligendi adipisci obcaecati quos reiciendis temporibus.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dzce6tyhc/image/upload/v1718120684/Yelp%20Camp/dzlitcnljosybprbnzux.jpg",
          filename: "Yelp Camp/dzlitcnljosybprbnzux",
        },
        {
          url: "https://res.cloudinary.com/dzce6tyhc/image/upload/v1718120684/Yelp%20Camp/q1dbg4ygn2yruyywudxg.jpg",
          filename: "Yelp Camp/q1dbg4ygn2yruyywudxg",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
