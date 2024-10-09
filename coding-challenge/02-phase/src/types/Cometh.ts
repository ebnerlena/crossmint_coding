import { Direction } from "./enums/Direction";
import { Planet } from "./Planet";

export type Cometh = {
	direction: Direction;
} & Planet;
