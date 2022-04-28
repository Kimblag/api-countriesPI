const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Country, Activity } = require("../db.js");
const { Op } = require("sequelize");

const getActivity = (req, res, next) => {
  Activity.findAll()
    .then((activity) => {
      res.status(200).send(activity);
    })
    .catch((error) => {
      res.status(500).send({ message: "Error getting activity" });
    });
};

const createActivity = async (req, res, next) => {
  try {
    const { countries, name, difficulty, duration, season } = req.body;
    name.toLowerCase();
    if (name && difficulty && duration && season) {
      countries.forEach(async (country) => {
        const newActivity = await Activity.create({
          name,
          difficulty,
          duration,
          season,
        });
        const countryActivity = await Country.findByPk(country);
        countryActivity.addActivity(newActivity);
      });

      res.status(201).send({ message: "Activity created successfully" });
    } else {
      return res.status(400).send({ message: "Missing fields" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error creating activity" });
  }
};

const updateActivity = (req, res, next) => {
  const { id } = req.params;
  const { name, difficulty, duration, season } = req.body;

  parseInt(difficulty);

  const activityDetail = Activity.findByPk(id);

  activityDetail
    .then((activity) => {
      activity.update({
        name,
        difficulty,
        duration,
        season,
      });
    })
    .then(() => {
      res.status(200).send({ message: "Activity updated successfully" });
    })
    .catch((error) => {
      res.status(500).send({ message: "Error updating activity", error });
    });
};

const getActivityDetails = (req, res, next) => {
  let { id } = req.params;
  id = parseInt(id);

  if (id) {
    let activity = Activity.findByPk(id);
    activity
      .then((response) => {
        if (!response) {
          return res.status(404).send({ message: "Activity not found" });
        } else {
          return res.status(200).send(response);
        }
      })
      .catch((error) => res.send({ message: "Error getting activity", error }));
  } else {
    res.status(400).send({ message: "Invalid country id" });
  }
};

const deleteActivity = (req, res, next) => {
  const { id } = req.params;
  
  Activity.destroy({
    where: {
      id,
    },
  })
    .then((activity) => {
      res.status(200).send({ message: "Activity deleted successfully" });
    })
    .catch((error) => {
      res.status(500).send({ message: "Error deleting activity", error });
    });
};

module.exports = {
  createActivity,
  updateActivity,
  deleteActivity,
  getActivity,
  getActivityDetails,
};
