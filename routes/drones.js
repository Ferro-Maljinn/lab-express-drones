const express = require("express");
const router = express.Router();
const Drone = require("../models/Drone.model");
const mongoose = require("mongoose");

let imagesArr = [
  "/public/images/black1.jpg",
  "/public/images/black2.jpg",
  "/public/images/black3.webp.jpg",
  "/public/images/white1",
  "/public/images/white2",
  "/public/images/white3",
  "/public/images/bee.jpg",
];

function getRandomImage(imgArr /* , path */) {
 /*  path = path || "/public/images/"; */
  let num = Math.floor(Math.random() * imgArr.length);
  var img = imgArr[num];
/*   var imgStr = <img src="/public/images/" + path + img +  alt = "An images of the Drone">;
  document.write(imgStr);
  document.close(); */

//  for (let i = 0; i < imagesArr.length; i++) {
//  let elem = imagesArr[i];
//}

}

//where do I invoke the function?
getRandomImage(imagesArr);
/* 
_________________________________________________*/


// require the Drone model here

router.get("/drones", async (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  try {
    const drones = await Drone.find();
    res.render("drones/list", { drones });
  } catch (error) {
    console.error(error);
  }
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form");
});

router.post("/drones/create", async (req, res, next) => {
  // Iteration #3: Add a new drone
  try {
    const { img, name, propellers, maxSpeed } = req.body;
    await Drone.create({
      img: img,
      name: name,
      propellers: propellers,
      maxSpeed: maxSpeed,
    });
    res.redirect("/drones");
  } catch (error) {
    console.log("An error occured");
    res.render("drones/create-form");
  }
});

router.get("/drones/:id/edit", async (req, res, next) => {
  // Iteration #4: Update the drone

  const droneId = mongoose.Types.ObjectId(req.params.id);
  const drone = await Drone.findById(droneId);
  res.render("drones/update-form", { drone });
});

router.post("/drones/:id/edit", async (req, res, next) => {
  // Iteration #4: Update the drone

  try {
    const { img, name, propellers, maxSpeed } = req.body;
    const droneId = mongoose.Types.ObjectId(req.params.id);
    await Drone.findByIdAndUpdate(droneId, {
      img: image,
      name: name,
      propellers: propellers,
      maxSpeed: maxSpeed,
    });
    res.redirect("/drones");
  } catch (error) {
    console.error(error);
  }
});

router.post("/drones/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  const droneId = mongoose.Types.ObjectId(req.params.id);
  Drone.findByIdAndDelete(droneId)
    .then(() => res.redirect("/drones"))
    .catch((error) => console.log("error - couldn't delete"));
});

module.exports = router;
