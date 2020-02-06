# gatsby-source-radar

Currently only deals with centres in the UK.

The plugin takes named centres and adds their details and details of events they host to graphql.

## Set The Config

In `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-radar',
      options: {
        centres: ['The Autonomous Centre of Edinburgh'],
      },
    },
  ],
};
```

Add an array of the centres you want to query, the name should match exactly the name listed on [radar.squat.net](radar.squat.net).

# radar API notes

[wiki](https://0xacab.org/radar/drupal-make/-/wikis/api/1.2/notes)
