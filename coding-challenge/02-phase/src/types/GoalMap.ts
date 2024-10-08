import { MegaverseItem } from "./enums/MegaverseItem";

export type GoalMap = {
	goal: GoalGrid;
};

type GoalGrid = readonly MegaverseItem[][];
