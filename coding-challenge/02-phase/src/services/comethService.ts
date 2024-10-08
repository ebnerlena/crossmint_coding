import { COMETHS_API_ENDPOINT } from "../constants/routes";
import { Cometh } from "../types/Cometh";
import { httpService } from "./httpService";
import { PlanetService } from "./interfaces/planetService";

export class ComethService implements PlanetService {
	private static _instance: ComethService;

	static get Instance(): ComethService {
		return this._instance || (this._instance = new this());
	}

	async place(planet: Cometh): Promise<Cometh> {
		return await httpService.post<Cometh>(COMETHS_API_ENDPOINT, planet);
	}
	async delete(planet: Cometh): Promise<Cometh> {
		return await httpService.delete<Cometh>(COMETHS_API_ENDPOINT, planet);
	}
}

export const comethService = ComethService.Instance;
