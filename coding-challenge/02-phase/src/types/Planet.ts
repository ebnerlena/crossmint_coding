import { Coordinates } from "./Coordinates";
import { Color } from "./enums/Color";
import { Direction } from "./enums/Direction";

export type Planet = {
	direction?: Direction;
	color?: Color;
} & Coordinates;
