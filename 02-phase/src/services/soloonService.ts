import { SOLOONS_API_ENDPOINT } from "../constants/routes";
import { Soloon } from "../types/Soloon";
import { httpService } from "./httpService";
import { PlanetService } from "./interfaces/planetService";

export class SoloonService implements PlanetService {
	private static _instance: SoloonService;

	static get Instance(): SoloonService {
		return this._instance || (this._instance = new this());
	}

	async place(planet: Soloon): Promise<Soloon> {
		return await httpService.post<Soloon>(SOLOONS_API_ENDPOINT, planet);
	}
	async delete(planet: Soloon): Promise<Soloon> {
		return await httpService.delete<Soloon>(SOLOONS_API_ENDPOINT, planet);
	}
}

export const soloonService = SoloonService.Instance;
