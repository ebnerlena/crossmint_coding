import * as dotenv from "dotenv";
import { Polyanet } from "./types/Polyanet";

dotenv.config();

const API_ROUTE = "https://challenge.crossmint.io/api/";
const POLYNETS_API_ENDPOINT = "/polyanets";
const DEFAULT_DELAY_MS = 1000;

// Function to place a 🪐 on the map
async function placePlanet(polyanet: Polyanet): Promise<boolean> {
	const { row, column } = polyanet;
	try {
		const response = await fetch(`${API_ROUTE}${POLYNETS_API_ENDPOINT}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				row: row,
				column: column,
				candidateId: process.env.CANDIDATE_ID,
			}),
		});

		if (!response.ok) {
			console.log(response.status, response.statusText);

			if (response.status === 429) {
				return false;
			}

			throw new Error(`${response.statusText}`);
		}

		await response.json();
		console.log(`🪐 placed at row: ${row}, column: ${column}`);
		return true;
	} catch (error) {
		console.error("Failed to place 🪐:", error);
		return false;
	}
}

// Coordinates of 🪐
const coordinates = [
	{ row: 2, column: 2 },
	{ row: 2, column: 8 },
	{ row: 3, column: 3 },
	{ row: 3, column: 7 },
	{ row: 4, column: 4 },
	{ row: 4, column: 6 },
	{ row: 5, column: 5 },
	{ row: 6, column: 4 },
	{ row: 6, column: 6 },
	{ row: 7, column: 3 },
	{ row: 7, column: 7 },
	{ row: 8, column: 2 },
	{ row: 8, column: 8 },
];

function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// Loop through the coordinates to place Polyanets
async function createMap() {
	for (const { row, column } of coordinates) {
		const newPolyanet: Polyanet = { row, column };

		let success = await placePlanet(newPolyanet);
		let retryCount = 1;

		while (!success && retryCount < 4) {
			// Add delay to overcome 429 Too Many Requests Error and retry 3 times
			console.log(`Retrying ${retryCount}: placing 🪐 at row: ${row}, column: ${column}`);
			await delay(DEFAULT_DELAY_MS * retryCount);

			retryCount++;
			success = await placePlanet(newPolyanet);
		}
	}
	console.log("\nFinished creating 🪐 megaverse!");
}

// Execute the map creation
createMap();
