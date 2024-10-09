import { GOAL_MAP_API_ENDPOINT } from "../constants/routes";
import { GoalMap } from "../types/GoalMap";
import { httpService } from "./httpService";

export class MapService {
	private static _instance: MapService;

	static get Instance(): MapService {
		return this._instance || (this._instance = new this());
	}

	async get(): Promise<GoalMap> {
		return await httpService.get<GoalMap>(GOAL_MAP_API_ENDPOINT());
	}
}

export const mapService = MapService.Instance;
