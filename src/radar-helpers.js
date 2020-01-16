const ace = 'The Autonomous Centre of Edinburgh';

const centreUUID = (name, groupJSON) => {
  const key = Object.keys(groupJSON.result).filter(
    k => groupJSON.result[k].title === name,
  )[0];
  return groupJSON.result[key].uuid;
};

const centreNode = (name, groupJSON) =>
  Object.keys(groupJSON.result).filter(
    k => groupJSON.result[k].title === name,
  )[0];

// takes a name and generates a centre url

const centreUrl = name => `www.radar.squat.net/${name}`;

// takes a name and generates a location url
// takes a name and generates an events url

module.exports = {ace, centreUrl, centreUUID, centreNode};
