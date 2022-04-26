//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require('axios');
const {Country} = require('./src/db.js')

// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
  let countriesApi = await axios.get("https://restcountries.com/v3/all")
  let countriesDB = await Country.findAll();
  if(countriesDB.length === 0){
  const countries = countriesApi.data.map(country => {
    return {
      id: country.cca3,
      name: country.name.common,
      flag: country.flags[1],
      continent: country.continents
        ? country.continents[0]
        : "Continent not found",
      capital: country.capital ? country.capital[0] : "Capital not found",
      subregion: country.subregion,
      area: country.area,
      population: country.population,
    };
  })
  await Country.bulkCreate(countries);
} else{
  console.log("Countries already in DB")
}

  server.listen(process.env.PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
