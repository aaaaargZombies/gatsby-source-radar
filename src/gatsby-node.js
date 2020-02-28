const {
	centreUUID,
	centreNode,
	centreURL,
	eventsURL,
	locationURL,
	centreImageURL,
	eventImageURL
} = require("./radar-helpers");

const fetch = require("node-fetch");

// Set the current active enviroment
let activeEnv =
	process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

// If we are in dev, ignore the fact that we may be using a fake SSL certificate
if (activeEnv == "development") {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const centreSlug = title => `/${title.toLowerCase().replace(/\s/g, "-")}`;

exports.sourceNodes = async (
	{ actions: { createNode }, createContentDigest, createNodeId },
	{ centres }
) => {
	// Do your stuff!
	let groupJson = await fetch(
		"https://radar.squat.net/api/1.2/search/groups.json?fields=offline,title,uuid&facets[country][]=GB"
	).then(res => res.json());

	const genNodes = async (centreName, groupJson) => {
		if (!centreNode(centreName, groupJson)) {
			console.error(`No centre found on radar under name: "${centreName}"`);
			return;
		}
		let centreJson = await fetch(centreURL(centreName, groupJson)).then(res =>
			res.json()
		);

		let locationJson = await fetch(
			locationURL(centreName, groupJson)
		).then(res => res.json());

		let eventJson = await fetch(eventsURL(centreName, groupJson)).then(res =>
			res.json()
		);

		let centreID = createNodeId(centreName);

		let events = Object.keys(eventJson.result).map(key => {
			return {
				id: createNodeId(key),
				parent: null,
				children: [],
				internal: {
					type: `event`,
					contentDigest: createContentDigest(eventJson.result[key])
				},
				imageUrl: eventImageURL(eventJson.result[key]),
				centre___NODE: centreID,
				...eventJson.result[key]
			};
		});

		createNode({
			id: centreID,
			parent: null,
			children: [],
			internal: {
				type: `centre`,
				contentDigest: createContentDigest({
					lat: locationJson.map.lat,
					lon: locationJson.map.lon,
					events___NODE: events.map(node => node.id),
					imageUrl: await centreImageURL(centreJson),
					slug: centreSlug(centreJson.title),
					...centreJson
				})
			},
			lat: locationJson.map.lat,
			lon: locationJson.map.lon,
			imageUrl: await centreImageURL(centreJson),
			events___NODE: events.map(node => node.id),
			slug: centreSlug(centreJson.title),
			...centreJson
		});

		events.forEach(node => createNode(node));
	};

	await Promise.all(centres.map(name => genNodes(name, groupJson)));
};
