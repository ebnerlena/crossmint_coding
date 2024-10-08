import { POLYNETS_API_ENDPOINT } from "../constants/routes";
import { Polyanet } from "../types/Polyanet";
import { httpService } from "./httpService";
import { PlanetService } from "./interfaces/planetService";

export class PolyanetService implements PlanetService {
	private static _instance: PolyanetService;

	static get Instance(): PolyanetService {
		return this._instance || (this._instance = new this());
	}

	async place(planet: Polyanet): Promise<Polyanet> {
		return await httpService.post<Polyanet>(POLYNETS_API_ENDPOINT, planet);
	}
	async delete(planet: Polyanet): Promise<Polyanet> {
		return await httpService.delete<Polyanet>(POLYNETS_API_ENDPOINT, planet);
	}
}

export const polyanetService = PolyanetService.Instance;
