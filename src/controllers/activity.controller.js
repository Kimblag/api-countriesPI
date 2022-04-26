const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Country, Activity } = require("../db.js");
const { Op } = require("sequelize");

const createActivity = async (req, res, next) => {
  try {
    const { countries, name, difficulty, duration, season } = req.body;
    name.toLowerCase();
    if (name && difficulty && duration && season) {
      const newActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
      });
      countries.map(
        async (country) =>
          await newActivity.addCountries(await Country.findByPk(country))
      );
      res.status(201).send(newActivity);
    } else {
      return res.status(400).send({ message: "Missing fields" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error creating activity" });
  }
};

module.exports = {
  createActivity,
};
