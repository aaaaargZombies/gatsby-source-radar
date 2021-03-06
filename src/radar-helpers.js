// https://radar.squat.net/api/1.2/search/groups.json?fields=offline,title,uuid&facets[country][]=GB
const fetch = require("node-fetch");

const centreNode = (name, groupJSON) =>
	Object.keys(groupJSON.result).filter(
		k => groupJSON.result[k].title === name
	)[0];

const centreUUID = (name, groupJSON) =>
	groupJSON.result[centreNode(name, groupJSON)].uuid;

// takes a name and generates a centre url

const centreURL = (name, groupJSON) =>
	`https://radar.squat.net/api/1.2/node/${centreUUID(name, groupJSON)}.json`;

const centreImageURL = async centreJSON => {
	return centreJSON.image.file
		? await fetch(centreJSON.image.file.uri + ".json").then(res =>
				res.json().then(json => json.url)
		  )
		: "";
};

// takes a name and generates a location url
const locationURL = (name, groupJSON) =>
	groupJSON.result[centreNode(name, groupJSON)].offline[0].uri + ".json";

// takes a name and generates an events url
const eventsURL = (name, groupJSON) =>
	`https://radar.squat.net/api/1.2/search/events.json?fields=offline,uuid,title,image,body,date_time,price&facets[group][]=${centreNode(
		name,
		groupJSON
	)}`;

const eventImageURL = eventJSON => {
	return eventJSON.image.file
		? `https://radar.squat.net/sites/default/files/${eventJSON.image.file.filename}`
		: "";
};

module.exports = {
	centreUUID,
	centreNode,
	centreURL,
	eventsURL,
	locationURL,
	centreImageURL,
	eventImageURL
};
