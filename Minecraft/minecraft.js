player.onChat("buduj_zamek", function () {
    player.say("Zamek jest w trakcie budowy... Nie ruszaj sie!")
    makeParter()
    makeWalls()
    makeMoat()
    makeCeiling()
    makeBridge()
    makeTowers()
    player.say("Zbudowano zamek")
})


let width = 21
let castleHeight = 10
let startPoint = 10;
let transformedWidth = width + startPoint;

function makeParter(){
    for(let x=startPoint; x<=transformedWidth; x++){
        shapes.line(LOG_DARK_OAK, pos(x, -1, startPoint), pos(x, -1, transformedWidth))
    }
}

function makeWallWithGate() {
    for (let y = 0; y <= 5; y++) {
        if(y > 2)
        {
            shapes.line(IRON_BARS, pos(startPoint, y, startPoint + 9), pos(startPoint, y, startPoint + 12))
        }
       shapes.line(STONE_BRICKS, pos(startPoint, y, startPoint), pos(startPoint, y, startPoint + 8))
       shapes.line(STONE_BRICKS, pos(startPoint, y, startPoint + 13), pos(startPoint, y, transformedWidth))
    }

    shapes.line(STONE_BRICKS, pos(startPoint, 6, startPoint), pos(startPoint, 6, startPoint + 9))
    shapes.line(IRON_BARS, pos(startPoint, 6, startPoint + 10), pos(startPoint, 6, startPoint + 11))
    shapes.line(STONE_BRICKS, pos(startPoint, 6, startPoint + 12), pos(startPoint, 6, transformedWidth))
    blocks.place(TORCH, pos(startPoint - 1, 2, startPoint + 8))
    blocks.place(TORCH, pos(startPoint - 1, 2, startPoint + 13))

    for (let y = 7; y <= castleHeight; y++) { //sciana z wejsciem (nad drzwiami)
       shapes.line(STONE_BRICKS, pos(startPoint, y, startPoint), pos(startPoint, y, transformedWidth))
    }

     for(let x = startPoint; x < transformedWidth; x++){ //grone elementy scian
         if(x % 2){
              blocks.place(STONE_MONSTER_EGG, pos(x, castleHeight + 1, startPoint))
         }
     }
}

function makeWalls () {
    makeWallWithGate()
    for (let y = 0; y <= castleHeight; y++) {
       shapes.line(STONE_BRICKS, pos(startPoint, y, startPoint), pos(transformedWidth, y, startPoint))
    }
  
    for(let x = startPoint; x < transformedWidth; x++){ //grone elementy scian
            if(x % 2){
                blocks.place(STONE_MONSTER_EGG, pos(x, castleHeight + 1, transformedWidth))
            }
        }

    for (let y = 0; y <= castleHeight; y++) {
       shapes.line(STONE_BRICKS, pos(transformedWidth, y, startPoint), pos(transformedWidth, y, transformedWidth))
    }

    for(let z = startPoint; z < transformedWidth; z++){ //grone elementy scian
         if(z % 2){
              blocks.place(STONE_MONSTER_EGG, pos(startPoint, castleHeight + 1, z))
         }
    }

    for (let y = 0; y <= castleHeight; y++) {
       shapes.line(STONE_BRICKS, pos(startPoint, y, transformedWidth), pos(transformedWidth, y, transformedWidth))
    }
      for(let z = startPoint; z < transformedWidth; z++){ //grone elementy scian
         if(z % 2){
              blocks.place(STONE_MONSTER_EGG, pos(transformedWidth, castleHeight + 1, z))
         }
    }
}

function makeTower(startPositionX:number, startPositionZ:number ) {
    let towerHeight = 15
    let towerWidth = 6
    
    for (let y = 0; y <= towerHeight; y++) {
       if(y == 13){
           shapes.line(STONE_BRICKS, pos(startPositionX, y, startPositionZ), pos(startPositionX, y, startPositionZ + 2))
           shapes.line(IRON_BARS, pos(startPositionX , y, startPositionZ + 2), pos(startPositionX , y, startPositionZ + 5))
           shapes.line(STONE_BRICKS, pos(startPositionX, y, startPositionZ + 5), pos(startPositionX, y, startPositionZ + towerWidth))
       }else{
           shapes.line(STONE_BRICKS, pos(startPositionX, y, startPositionZ), pos(startPositionX, y, startPositionZ + towerWidth))
       }
    }
        for(let x = startPositionX; x <= towerWidth + startPositionX; x++){ //grone elementy scian
         if(x % 2){
              blocks.place(STONE_MONSTER_EGG, pos(x, towerHeight + 1, startPositionZ))
         }
     }
 

     for (let y = 0; y <= towerHeight; y++) {
         if(y == 13){
            shapes.line(STONE_BRICKS, pos(startPositionX, y, startPositionZ), pos(startPositionX + 2, y, startPositionZ))
            shapes.line(IRON_BARS, pos(startPositionX + 2, y, startPositionZ), pos(startPositionX + 5, y, startPositionZ))
            shapes.line(STONE_BRICKS, pos(startPositionX + 5, y, startPositionZ), pos(startPositionX + towerWidth, y, startPositionZ))
         }else{
            shapes.line(STONE_BRICKS, pos(startPositionX, y, startPositionZ), pos(startPositionX + towerWidth, y, startPositionZ))
         }
       
    }

        for(let z = startPositionZ; z <= towerWidth + startPositionZ; z++){ //grone elementy scian
         if(z % 2){
              blocks.place(STONE_MONSTER_EGG, pos(startPositionX, towerHeight + 1, z))
         }
     }

     for (let y = 0; y <= towerHeight; y++) {
         if(y == 13){
            shapes.line(STONE_BRICKS, pos(startPositionX + towerWidth, y, startPositionZ), pos(startPositionX + towerWidth, y, startPositionZ + 2))
            shapes.line(IRON_BARS, pos(startPositionX + towerWidth, y, startPositionZ + 2), pos(startPositionX + towerWidth, y, startPositionZ + 5))
            shapes.line(STONE_BRICKS, pos(startPositionX + towerWidth, y, startPositionZ + 5), pos(startPositionX + towerWidth, y, startPositionZ + towerWidth))
         }else{
            shapes.line(STONE_BRICKS, pos(startPositionX + towerWidth, y, startPositionZ), pos(startPositionX + towerWidth, y, startPositionZ + towerWidth))
         }
      
    }

        for(let z = startPositionZ; z <= towerWidth + startPositionZ; z++){ //grone elementy scian
         if(z % 2){
              blocks.place(STONE_MONSTER_EGG, pos(startPositionX + towerWidth, towerHeight + 1, z))
         }
     }

     for (let y = 0; y <= towerHeight; y++) {
       if(y == 13){
        shapes.line(STONE_BRICKS, pos(startPositionX, y, startPositionZ + towerWidth), pos(startPositionX + 2, y, startPositionZ + towerWidth))
        shapes.line(IRON_BARS, pos(startPositionX + 2, y, startPositionZ + towerWidth), pos(startPositionX + 5, y, startPositionZ + towerWidth))
        shapes.line(STONE_BRICKS, pos(startPositionX + 5, y, startPositionZ + towerWidth), pos(startPositionX + towerWidth, y, startPositionZ + towerWidth))
       }else{
        shapes.line(STONE_BRICKS, pos(startPositionX, y, startPositionZ + towerWidth), pos(startPositionX + towerWidth, y, startPositionZ + towerWidth))
       }
      
    }

     for(let x = startPositionX; x <= towerWidth + startPositionX; x++){ //grone elementy scian
         if(x % 2){
              blocks.place(STONE_MONSTER_EGG, pos(x, towerHeight + 1, startPositionZ + towerWidth))
         }
     }

      for(let x=startPositionX + 1; x<startPositionX + towerWidth; x++){
        shapes.line(DIAMOND_BLOCK, pos(x, towerHeight - 1, startPositionZ + 1), pos(x, towerHeight - 1, startPositionZ + towerWidth - 1))
    }
}

function makeTowers() {
    makeTower(startPoint - 3, startPoint -3)
    makeTower(startPoint - 3, transformedWidth - 3)
    makeTower(transformedWidth - 3, startPoint - 3)
    makeTower(transformedWidth - 3, transformedWidth - 3)
}

function makeMoat(){
    for(let y = -1; y>=-2; y--){
        shapes.line(WATER, pos(startPoint - 4, y, startPoint - 4), pos(transformedWidth + 4, y,startPoint - 4))
        shapes.line(WATER, pos(startPoint - 4, y, startPoint - 5), pos(transformedWidth + 4, y, startPoint - 5))
        shapes.line(WATER, pos(startPoint - 4, y, startPoint - 6), pos(transformedWidth + 4, y, startPoint - 6))
    }
     for(let y = -1; y>=-2; y--){
        shapes.line(WATER, pos(startPoint - 4, y, startPoint - 6), pos(startPoint - 4, y, transformedWidth + 4))
        shapes.line(WATER, pos(startPoint - 5, y, startPoint - 6), pos(startPoint - 5, y, transformedWidth + 4))
        shapes.line(WATER, pos(startPoint - 6, y, startPoint - 6), pos(startPoint - 6, y, transformedWidth + 4))
    }
     for(let y = -1; y>=-2; y--){
        shapes.line(WATER, pos(startPoint - 6, y, transformedWidth + 4), pos(transformedWidth + 4, y, transformedWidth + 4))
        shapes.line(WATER, pos(startPoint - 6, y, transformedWidth + 5), pos(transformedWidth + 4, y, transformedWidth + 5))
        shapes.line(WATER, pos(startPoint - 6, y, transformedWidth + 6), pos(transformedWidth + 4, y, transformedWidth + 6))
    }
     for(let y = -1; y>=-2; y--){
        shapes.line(WATER, pos(transformedWidth + 4, y, startPoint - 6), pos(transformedWidth + 4, y, transformedWidth + 6))
        shapes.line(WATER, pos(transformedWidth + 5, y, startPoint - 6), pos(transformedWidth + 5, y, transformedWidth + 6))
        shapes.line(WATER, pos(transformedWidth + 6, y, startPoint - 6), pos(transformedWidth + 6, y, transformedWidth + 6))
    }
}

function makeBridge() {
    for(let i = 0; i < 4; i++)
    {
        shapes.line(STRIPPED_BIRCH_WOOD, pos(startPoint , -1, 9 + i + startPoint), pos(startPoint - 3, -1,9 + i + startPoint ))
        blocks.place(ACACIA_WOOD_SLAB, pos(startPoint - 3, 0, 9 + i + startPoint))
        shapes.line(STRIPPED_ACACIA_WOOD, pos(startPoint - 4, 0,9 + i + startPoint), pos(startPoint - 6, 0,9 + i + startPoint ))
        blocks.place(ACACIA_WOOD_SLAB, pos(startPoint - 7, 0, 9 + i + startPoint))
        shapes.line(STRIPPED_BIRCH_WOOD, pos(startPoint - 7, -1, 9+i+startPoint ), pos(startPoint - 9, -1,9 + i + startPoint ))
    }
    shapes.line(ACACIA_FENCE, pos(startPoint - 4, 1, 9  + startPoint), pos(startPoint - 6, 1, 9 + startPoint ))
    shapes.line(ACACIA_FENCE, pos(startPoint - 4, 1, 12 + startPoint), pos(startPoint - 6, 1, 12 + startPoint ))

}


function makeCeiling() {
    for(let x=startPoint + 1; x < transformedWidth; x++){
        shapes.line(GOLD_BLOCK, pos(x, castleHeight - 1, startPoint + 1), pos(x, castleHeight - 1, transformedWidth -1))
    }
    let i = 0;
    for(let y = castleHeight - 1; y >= 0; y--){
        shapes.line(BRICK_STAIRS, pos(transformedWidth - 2 - i,y,startPoint + 10), pos(transformedWidth - 2 - i,y,startPoint + 13))
    i++
    }

    for(let x = 0; x <= 3; x++){
        shapes.line(AIR, pos(transformedWidth - 3 - x,castleHeight - 1,startPoint + 10), pos(transformedWidth - 3 - x,castleHeight - 1,startPoint + 13))
    }
    for(let x = 0; x <= 4; x++){
        shapes.line(GLASS, pos(transformedWidth - 6 - x,castleHeight - 1,startPoint + 10), pos(transformedWidth - 6 - x,castleHeight - 1,startPoint + 13))
    }
}

