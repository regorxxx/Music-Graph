'use strict';

// Required since this script is loaded on browsers for drawing too!
try { // On foobar
	include(fb.ProfilePath + 'scripts\\SMP\\xxx-scripts\\ngraph\\ngraph.graph.js');
	include(fb.ProfilePath + 'scripts\\SMP\\xxx-scripts\\ngraph\\a-star.js');
	include(fb.ProfilePath + 'scripts\\SMP\\xxx-scripts\\ngraph\\a-greedy-star.js');
	include(fb.ProfilePath + 'scripts\\SMP\\xxx-scripts\\ngraph\\NBA.js');
} catch (e) { // On browsers
	// same files must be loaded on html
	console.log('\'ngraph_helpers_xxx\' script is being used on browser. Omitting \'include\' clause.');
}

//Gets total weight distance for the path
//Needs valid path! i.e. if path is from NodeA to NodeA, it outputs nothing
function get_distanche_from_path(graph, path) {
		let distanceGraph = Infinity;
		let path_length = path.length;
		let i ;
		if (path.length == 1) {
			throw new Error('Invalid path');
		} else {
			for (i = 0; i < path_length - 1;i++) {
				let link = graph.getLink(path[i].id, path[i+1].id) !== null ? graph.getLink(path[i].id, path[i+1].id) : graph.getLink(path[i+1].id, path[i].id);
				if (distanceGraph !== Infinity) {distanceGraph += link.data.weight;}
				else {distanceGraph = link.data.weight;}
			}
		}
		return distanceGraph;
}

//Gets array of nodes on the path
function get_nodes_from_path(graph, path) {
		let idpath = path[0].id;
		let path_length = path.length;
		let i;
		for (i = 1; i < path_length;i++) {
			idpath += " <- " + path[i].id;
		}
		return idpath;
}

//Finds distance between two nodes, Path is calculated on the fly.
function calc_map_distance(mygraph, key_one, key_two, bUseInfluence = false) {
		const method = "NBA" // Minimal speed differences found for our weighted graph...
		
		let distanceGraph = Infinity;
		let influenceDistanceGraph = 0;
		
		
		if (!key_one || !key_two || !mygraph) {
			return [distanceGraph , influenceDistanceGraph];
		}
		
		let nodeOne = mygraph.getNode(key_one);
		let nodeTwo = mygraph.getNode(key_two);
		if (!nodeOne || !nodeTwo) { //If node not on graph, skip calc.
			return [distanceGraph , influenceDistanceGraph];
		}
		
		if (nodeOne == nodeTwo) { //Same node, skip calc.
			distanceGraph = 0;
			return [distanceGraph , influenceDistanceGraph];
		}
		
		let pathFinder;
		if (method == "A*greedy") {
			pathFinder = aStarBi(mygraph, {
				distance(fromNode, toNode, link) {
				return link.data.weight;
				}
		});
		} else if (method == "A*") {
			pathFinder = aStarPathSearch(mygraph, {
				distance(fromNode, toNode, link) {
				return link.data.weight;
				}
			});
		} else {
			pathFinder = nba(mygraph, {
				distance(fromNode, toNode, link) {
				return link.data.weight;
				}
			});
		}
		
		let path = [];
		let idpath = "";

		path = pathFinder.find(key_one, key_two);
		distanceGraph = get_distanche_from_path(mygraph, path);
		
		if (bUseInfluence) {
			let links = []
			mygraph.forEachLinkedNode(key_one, function(linkedNode, link){
				if (link.fromId === key_one && link.toId === key_two || link.fromId === key_two && link.toId === key_one) {
					links.push(link);
				}
			});
			let i = links.length;
			while (i--){
				let ilink = links[i];
				if (ilink.data.absoluteWeight) {
					influenceDistanceGraph += ilink.data.absoluteWeight; // Called absolute because it's added to the total distance!
					// console.log(key_one +" -> " + key_two + " - " + influenceDistanceGraph);
				}
			}
		}
		return [distanceGraph, influenceDistanceGraph];
}

// Finds distance between all nodes on map. Returns a map with {distance, influenceDistance} and keys 'nodeA-nodeB'.
function calcCacheLinkAll(mygraph, limit = -1) {
		let cache = new Map();
		let node_list = [];

		mygraph.forEachNode(function(node){
			node_list.push(node.id);}
		);
		
		let node_list_length = node_list.length;
		let i = 0;
		while (i < node_list_length){
			let j = i + 1;
			while (j < node_list_length){
				let [ij_distance, ij_antinfluenceDistance] = calc_map_distance(mygraph, node_list[i], node_list[j], true);
				if (limit == -1 || ij_distance <= limit) {
					cache.set(node_list[i]+ '-' + node_list[j], {distance: ij_distance, influenceDistance: ij_antinfluenceDistance});
				}
				j++;
			}
			i++;
		}
		return cache;
}

// Finds distance between all SuperGenres on map. Returns a map with {distance, influenceDistance} and keys 'nodeA-nodeB'.
function calcCacheLinkSG(mygraph, limit = -1) {
		let cache = new Map();
		let node_list = [];
		
		node_list = [...new Set(music_graph_descriptors.style_supergenre.flat(2))]; // all values without duplicates

		let node_list_length = node_list.length;
		let i = 0;
		while (i < node_list_length){
			let j = i + 1;
			while (j < node_list_length){
				let [ij_distance, ij_antinfluenceDistance] = calc_map_distance(mygraph, node_list[i], node_list[j], true);
				if (limit == -1 || ij_distance <= limit) {
					cache.set(node_list[i]+ '-' + node_list[j], {distance: ij_distance, influenceDistance: ij_antinfluenceDistance});
				}
				j++;
			}
			i++;
		}
		return cache;
}

function getAntiInfluences(genreStyle) {
	const doubleIndex = music_graph_descriptors.style_anti_influence.flat().indexOf(genreStyle);
	const index = !(doubleIndex & 1) ? doubleIndex / 2 : -1; // -1 for odd indexes, halved for even values
	if (index != -1) {
		return music_graph_descriptors.style_anti_influence[index][1];
	}
	return [];
}

function getInfluences(genreStyle) {
	const doubleIndex = music_graph_descriptors.style_primary_origin.flat().indexOf(genreStyle);
	const index = !(doubleIndex & 1) ? doubleIndex / 2 : -1; // -1 for odd indexes, halved for even values
	if (index != -1) {
		return music_graph_descriptors.style_primary_origin[index][1];
	}
	return [];
}

const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const capitalizeAll = (s, sep = ' ') => {
  if (typeof s !== 'string') return '';
  return s.split(sep).map( (subS) => {return subS.charAt(0).toUpperCase() + subS.slice(1);}).join(sep); // Split, capitalize each subString and join
}