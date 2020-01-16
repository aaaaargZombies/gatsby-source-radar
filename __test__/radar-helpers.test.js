const {ace, centreUrl, centreUUID, centreNode} = require('../radar-helpers');
const groupJSON = require('./groupsUK.json');

test('Uses name of centre to provide UUID from groups JSON', () => {
  expect(centreUUID('DIY Space for London', groupJSON)).toBe(
    '01d0f3dd-ff89-4556-9ef9-14f2e551b618',
  );
});

test('Uses name of centre to provide node from groups JSON', () => {
  expect(centreNode('DIY Space for London', groupJSON)).toBe('157485');
});
