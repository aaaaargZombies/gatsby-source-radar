// const {
//   flattenArray,
//   getCurrentTimestamp,
//   isArray,
//   isObject,
//   isObjEmpty,
// } = require('./utils/helpers');

const {ace, centreUrl} = require('./radar-helpers');

console.log(centreUrl(ace));

const fetch = require('node-fetch');

// Set the current active enviroment
let activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';

// If we are in dev, ignore the fact that we may be using a fake SSL certificate
if (activeEnv == 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

exports.sourceNodes = async (
  {actions: {createNode}, createContentDigest, createNodeId},
  {centres},
) => {
  // Do your stuff!
  let json = await fetch(
    'https://radar.squat.net/api/1.2/search/events.json?facets[group][]=23333',
  ).then(res => res.json());

  let events = Object.keys(json.result).map(key => {
    return {
      id: createNodeId(key),
      parent: null,
      children: [],
      internal: {
        type: `event`,
        contentDigest: createContentDigest(json.result[key]),
      },
      centre: centres[0],
      ...json.result[key],
    };
  });

  events.forEach(node => createNode(node));
};
