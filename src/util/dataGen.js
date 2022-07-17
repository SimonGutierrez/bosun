const Chance = require("chance");
const chance = new Chance();
const _ = require("lodash");

const makeSchools = (n = 100) => {
  return _.range(0, n).map(() => {
    return makeSchool();
  });
};
const makeSchool = () => {
  return {
    name: `School of ${chance.city()}`,
    id: chance.guid(),
    lastDate: chance.date({
      year: 2022,
      month: chance.integer({
        min: 7,
        max: 11,
      }),
    }),
  };
};

console.log(JSON.stringify(makeSchools(), null, 2));
