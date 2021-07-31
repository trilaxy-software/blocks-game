let test = new Test( 'Tetris' )

//test.run( 'testRandomPiecePosition' )
test.runAll()

test.showResults( 'output' )

function testRandomPiece() {

  this.assertEqual( 'all pieces should be able to picked', 
    pieces.length - 1, Math.floor( 0.9999 * pieces.length ) )

}

function testRandomPiecePosition() {

  this.log( pieces )

}
