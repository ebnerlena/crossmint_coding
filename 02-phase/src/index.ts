import * as dotenv from "dotenv";
import { mapService } from "./services/mapService";
import { MegaverseItem } from "./types/enums/MegaverseItem";
import { Planet } from "./types/Planet";
import { Soloon } from "./types/Soloon";
import { Polyanet } from "./types/Polyanet";
import { Cometh } from "./types/Cometh";
import { Coordinates } from "./types/Coordinates";
import { Direction } from "./types/enums/Direction";
import { Color } from "./types/enums/Color";
import { soloonService } from "./services/soloonService";
import { comethService } from "./services/comethService";
import { polyanetService } from "./services/polyanetService";

dotenv.config();

const parsePlanetType = (item: MegaverseItem, coordinates: Coordinates): Planet | null => {
	switch (item) {
		case MegaverseItem.RIGHT_COMETH:
			return { direction: Direction.RIGHT, ...coordinates };
		case MegaverseItem.LEFT_COMETH:
			return { direction: Direction.LEFT, ...coordinates };
		case MegaverseItem.UP_COMETH:
			return { direction: Direction.UP, ...coordinates };
		case MegaverseItem.DOWN_COMETH:
			return { direction: Direction.DOWN, ...coordinates };
		case MegaverseItem.WHITE_SOLOON:
			return { color: Color.WHITE, ...coordinates };
		case MegaverseItem.BLUE_SOLOON:
			return { color: Color.BLUE, ...coordinates };
		case MegaverseItem.RED_SOLOON:
			return { color: Color.RED, ...coordinates };
		case MegaverseItem.PURPLE_SOLOON:
			return { color: Color.PURPLE, ...coordinates };
		case MegaverseItem.POLYANET:
			return { ...coordinates };
		default:
			return null;
	}
};

const extractPlanetsToBePlaced = async (): Promise<Planet[]> => {
	const goalMap = await mapService.get();
	const planets: Planet[] = [];

	for (let x = 0; x < goalMap.goal.length; x++) {
		const row = goalMap.goal[x];
		for (let y = 0; y < row.length; y++) {
			const rawPlanetType = row[y];
			const parsedPlanet = parsePlanetType(rawPlanetType, { row: x, column: y });

			if (parsedPlanet !== null) {
				planets.push(parsedPlanet);
			}
		}
	}

	return planets;
};

const createMap = async () => {
	const planets = await extractPlanetsToBePlaced();

	for await (const planet of planets) {
		if ("color" in planet) {
			console.log("placing 🌕 SOLoon", { ...planet });
			await soloonService.place(planet as Soloon);
		} else if ("direction" in planet) {
			console.log("placing ☄️  ComETH", { ...planet });
			await comethService.place(planet as Cometh);
		} else {
			console.log("placing 🪐 POLyanet", { ...planet });
			await polyanetService.place(planet as Polyanet);
		}
	}

	console.log("\nFinished creating 🪐 ☄️  🌕 megaverse!");
};

createMap();
