import { API_ROUTE } from "../constants/urls";
import { ERROR_CODE } from "../constants/errorCodes";

const RETRY_LIMIT = 3;
const DEFAULT_DELAY_MS = 1000;

const DEFAULT_HEADERS = {
	"Content-Type": "application/json",
};

const CANDIDATE_ID = () => process.env.CANDIDATE_ID;

export class HttpService {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	private static _instance: HttpService;

	static get Instance(): HttpService {
		return this._instance || (this._instance = new this(API_ROUTE()));
	}

	// Helper method for making the actual fetch call
	private async fetchRequest(endpoint: string, options: RequestInit, retries: number = RETRY_LIMIT): Promise<void> {
		try {
			const response = await fetch(`${this.baseUrl}${endpoint}`, options);
			if (!response.ok) {
				if (response.status === ERROR_CODE.TOO_MANY_REQUESTS && retries > 0) {
					console.warn(`429 Error: Retrying ${endpoint}... (${RETRY_LIMIT - retries + 1})`);
					await this.delay(DEFAULT_DELAY_MS * (RETRY_LIMIT - retries + 1));
					return this.fetchRequest(endpoint, options, retries - 1);
				}

				throw new Error(`HTTP Error: ${response.status}. ${response.statusText}`);
			}
			return await response.json();
		} catch (error) {
			console.error("HTTP request failed:", error);
			throw error;
		}
	}
	// Helper method for adding a delay
	private delay(ms: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	// GET request method
	async get<T = unknown>(endpoint: string): Promise<T> {
		return this.fetchRequest(endpoint, {
			method: "GET",
		}) as T;
	}

	// POST request method
	async post<T = unknown>(endpoint: string, data: T): Promise<T> {
		const response = this.fetchRequest(endpoint, {
			method: "POST",
			headers: DEFAULT_HEADERS,
			body: JSON.stringify({ candidateId: CANDIDATE_ID(), ...data }),
		});

		return response as T;
	}

	// DELETE request method
	async delete<T = unknown>(endpoint: string, data: T): Promise<T> {
		return this.fetchRequest(endpoint, {
			method: "DELETE",
			headers: DEFAULT_HEADERS,
			body: JSON.stringify({ candidateId: CANDIDATE_ID(), ...data }),
		}) as T;
	}
}

export const httpService = HttpService.Instance;
