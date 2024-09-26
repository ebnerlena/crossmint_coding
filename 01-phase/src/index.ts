import * as dotenv from "dotenv";
import { Polyanet } from "./types/Polyanet";

dotenv.config();

const API_ROUTE = "https://challenge.crossmint.io/api/";
const POLYNETS_API_ENDPOINT = "/polyanets";
const DEFAULT_DELAY_MS = 1000;
const GRID_SIZE = 11;
const GRID_OFFSET = 2;
const RETRY_LIMIT = 4;

// Function to place a 🪐 on the map
const placePlanet = async (polyanet: Polyanet): Promise<boolean> => {
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
			// Handle Too Many Requests Error
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
};

const generateCoordinatesofPolyanets = (): Array<Polyanet> => {
	const coordinates = new Set<Polyanet>();

	for (let y = GRID_OFFSET; y < GRID_SIZE - GRID_OFFSET; y++) {
		coordinates.add({ row: y, column: y }); // First column (X)
		coordinates.add({ row: y, column: GRID_SIZE - (y + 1) }); // Symmetrical column (X mirrored)
	}

	return Array.from(coordinates);
};

const delay = (ms: number) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

// Loop through the coordinates to place Polyanets
const createMap = async () => {
	const polyanets = generateCoordinatesofPolyanets();

	for (const polyanet of polyanets) {
		let success = await placePlanet(polyanet);
		let retryCount = 1;

		while (!success && retryCount < RETRY_LIMIT) {
			// Add delay to overcome 429 Too Many Requests Error and retry 3 times
			console.log(`Retrying ${retryCount}: placing 🪐 at row: ${polyanet.row}, column: ${polyanet.column}`);
			await delay(DEFAULT_DELAY_MS * retryCount);

			retryCount++;
			success = await placePlanet(polyanet);
		}
	}
	console.log("\nFinished creating 🪐 megaverse!");
};

// Execute the map creation
createMap();
