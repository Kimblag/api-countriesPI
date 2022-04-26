const { Country, Activity } = require("../db.js");
const { Op } = require("sequelize");

const getCountries = async (req, res, next) => {
  try {
    const countries = await Country.findAll({ include: Activity });
    if (req.query.name) {
      let { name } = req.query;
      name = name.trim().charAt(0).toUpperCase() + name.trim().slice(1);
      if (
        typeof name === "string" &&
        name.length > 0 &&
        name.match(/^[a-zA-Z]+$/)
      ) {
        let country = await Country.findAll({
          include: Activity,
          where: {
            name: {
              [Op.iLike]: "%" + name + "%",
            },
          },
        });
        if (country.length === 0) {
          return res.status(404).send({ message: "Country not found" });
        } else {
          res.status(200).send(country);
        }
      } else {
        res.status(400).send({ message: "Invalid country name" });
      }
    } else {
      res.status(200).send(countries);
    }
  } catch (error) {
    res.status(500).send({ message: "Error getting countries" });
  }
};

const getCountryById = (req, res, next) => {
  let { id } = req.params;
  id = id.toUpperCase().trim();
  if (typeof id === "string" && id.length === 3 && id.match(/^[A-Z]{3}$/)) {
    if (id) {
      let country = Country.findByPk(id, {
        include: Activity,
      });
      country
        .then((response) => {
          if (!response) {
            return res.status(404).send({ message: "Country not found" });
          } else {
            return res.status(200).send(response);
          }
        })
        .catch((error) =>
          res.send({ message: "Error getting country", error })
        );
    }
  } else {
    res.status(400).send({ message: "Invalid country id" });
  }
};

module.exports = {
  getCountries,
  getCountryById,
};
