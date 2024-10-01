const attack = (coodinates: Coordinates, attackBoard: Board): AttackResult  => {

    const {x, y} = coodinates;


    let attackResult: AttackResult = AttackResult.MISS;
    attackBoard.forEach((ship) => {
        const shipCoordinatesHitIndex = ship.coordinates.findIndex(c => c.x === x && c.y === y)


        if(shipCoordinatesHitIndex !== -1 && ship.coordinates[shipCoordinatesHitIndex].status === ShipStatus.ALIVE) {
            ship.coordinates[shipCoordinatesHitIndex].status = ShipStatus.HITTEN;
            attackResult =  AttackResult.HIT;

            const shipIsDead = ship.coordinates.every(c => c.status === ShipStatus.HITTEN);

            if(shipIsDead) {
                ship.coordinates.forEach(c => c.status = ShipStatus.SUNKEN);
                attackResult = AttackResult.SINK;
            }            
        }

    });


    const hasWon = attackBoard.every(ship => ship.coordinates.every(coodinates => coodinates.status === ShipStatus.SUNKEN))
    if(hasWon) {
        attackResult = AttackResult.WIN;
    }

   return attackResult;
}

type Coordinates = {
    x: number,
    y: number,
}

enum AttackResult {
    MISS,
    HIT,
    SINK,
    WIN,
}

enum ShipStatus {
    ALIVE,
    HITTEN,
    SUNKEN,
}

// board size: 4x4  (actually 10x10 - 100x100)

type Board = Ship[]

type ShipCoordinates = {
    status: ShipStatus
} & Coordinates;

type Ship  = {
    coordinates: ShipCoordinates[]
}


const ship1: Ship = {
 coordinates: [{x: 1, y: 1, status: ShipStatus.ALIVE}]
}
const ship2: Ship = {
    coordinates: [{x: 2, y: 3, status: ShipStatus.ALIVE}, {x: 2, y: 4, status: ShipStatus.ALIVE}]
}

const board1: Board = 
[
    ship1,
    ship2,
]

// make attack!!!
attack({x: 2, y: 3}, board1);