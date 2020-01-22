const {
  ace,
  centreUUID,
  centreNode,
  centreURL,
  eventsURL,
  locationURL,
} = require('../radar-helpers');
const groupJSON = require('./groupsukoffline.json');

test('use name of centre to provide UUID from groups JSON', () => {
  expect(centreUUID('DIY Space for London', groupJSON)).toBe(
    '01d0f3dd-ff89-4556-9ef9-14f2e551b618',
  );
});

test('use name of centre to provide node from groups JSON', () => {
  expect(centreNode('DIY Space for London', groupJSON)).toBe('157485');
});

test('Use name of centre to generate url for centre info', () => {
  expect(centreURL('DIY Space for London', groupJSON)).toBe(
    'https://radar.squat.net/api/1.2/node/01d0f3dd-ff89-4556-9ef9-14f2e551b618.json',
  );
});

test('Use name of centre to generate url for events info', () => {
  expect(eventsURL('DIY Space for London', groupJSON)).toBe(
    'https://radar.squat.net/api/1.2/search/events.json?facets[group][]=157485',
  );
});

test('Use name of centre to generate url for location info', () => {
  expect(locationURL('DIY Space for London', groupJSON)).toBe(
    'https://radar.squat.net/api/1.2/location/95e2b4fe-8713-4060-bd62-2505dd73043a.json',
  );
});
