// Iteration #1
require("../db");
const async = require("hbs/lib/async");
const Drone = require("../models/Drone.model");
const mongoose = require("mongoose");
const drones = [
  { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
  { name: "Racer 57", propellers: 4, maxSpeed: 20 },
  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 },
];
async function main() {
  try {
    await Drone.create(drones);
    console.log("All the drones were seeded!");
  } catch (err) {
    console.log("There was an error in seeding the drones");
  } finally {
    mongoose.disconnect();
    console.log("connection has been disconnected");
  }
}
main();