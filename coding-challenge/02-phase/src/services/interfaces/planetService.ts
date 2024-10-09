import { Planet } from "../../types/Planet";

export abstract class PlanetService {
	static Instance: PlanetService;

	/** Add a planet.
	 * @param {planet} planet: The planet to be placed on the specified position in the map.
	 */
	abstract place(planet: Planet): Promise<Planet>;

	/** Delete a planet.
	 * @param {planet} planet: The planet to be deleted on the specified position in the map.
	 */
	abstract delete(planet: Planet): Promise<Planet>;
}
