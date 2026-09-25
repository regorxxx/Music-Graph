'use strict';

function getStarPoints(nodeSize) {
	const starWidth = nodeSize;
	const starHeight = nodeSize;
	const centerX = starWidth / 2;
	const centerY = starHeight / 2;
	const innerCirclePoints = 5; // a 5 point star
	// starWidth --> this is the beam length of each
	// side of the SVG square that holds the star
	const innerRadius = starWidth / innerCirclePoints;
	const innerOuterRadiusRatio = 2.5; // set star sharpness/chubyness
	const outerRadius = innerRadius * innerOuterRadiusRatio;
	return calcStarPoints(centerX, centerY, innerCirclePoints, innerRadius, outerRadius);
}

function calcStarPoints(centerX, centerY, innerCirclePoints, innerRadius, outerRadius) {
	const angle = (Math.PI / innerCirclePoints);
	const angleOffsetToCenterStar = 0;
	const totalPoints = innerCirclePoints * 2; // 10 in a 5-points star
	let points = '';
	for (let i = 0; i < totalPoints; i++) {
		const isEvenIndex = i % 2 === 0;
		const r = isEvenIndex ? outerRadius : innerRadius;
		const currX = centerX + Math.cos(i * angle + angleOffsetToCenterStar) * r;
		const currY = centerY + Math.sin(i * angle + angleOffsetToCenterStar) * r;
		points += currX + ',' + currY + ' ';
	}
	return points;
}

function getStarPointsOffset(nodeSize, offsetX, offsetY) {
	const starWidth = nodeSize;
	const starHeight = nodeSize;
	const centerX = starWidth / 2 + offsetX;
	const centerY = starHeight / 2 + offsetY;
	const innerCirclePoints = 5; // a 5 point star
	// starWidth --> this is the beam length of each
	// side of the SVG square that holds the star
	const innerRadius = starWidth / innerCirclePoints;
	const innerOuterRadiusRatio = 2.5; // set star sharpness/chubyness
	const outerRadius = innerRadius * innerOuterRadiusRatio;
	return calcStarPoints(centerX, centerY, innerCirclePoints, innerRadius, outerRadius);
}