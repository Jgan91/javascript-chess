


//Defining the board array
const numBoardSq = 120;

//Defining the pieces on squares
const pieces = {empty: 0, wP: 1, wN: 2, wB: 3, wR: 4, wQ: 5, wK:6,
                bP: 7, bN: 8, bB: 9, bR: 10, bQ: 11, bK: 12};

const colors = {white: 0, black: 1, both: 2};

//white castle kingside, queenside ....permission bits
const castleBits = {wCK: 1, wCQ: 2, bCK: 4, bCQ: 8};

//Defining the files
const files = {fileA: 0, fileB: 1, fileC: 2, fileD: 3, fileE: 4, fileF: 5, fileG: 6, fileH: 7, fileNO: 8};

//Defining the ranks
const ranks = {rank1: 0, rank2: 1, rank3: 2, rank4: 3, rank5: 4, rank6: 5, rank7: 6, rank8:7, rankNO: 8};
//Defining the top and bottom of the board, and key squares
const squares = {
  A1: 21, B1: 22, C1: 23, D1: 24, E1: 25, F1: 26, G1: 27, H1: 28,
  A2: 31, B2: 32, C2: 33, D2: 34, E2: 35, F2: 36, G2: 37, H2: 38,
  A3: 41, B3: 42, C3: 43, D3: 44, E3: 45, F3: 46, G3: 47, H3: 48,
  A4: 51, B4: 52, C4: 53, D4: 54, E4: 55, F4: 56, G4: 57, H4: 58,
  A5: 61, B5: 62, C5: 63, D5: 64, E5: 65, F5: 66, G5: 67, H5: 68,
  A6: 71, B6: 72, C6: 73, D6: 74, E6: 75, F6: 76, G6: 77, H6: 78,
  A7: 81, B7: 82, C7: 83, D7: 84, E7: 85, F7: 86, G7: 87, H7: 88,
  A8: 91, B8: 92, C8: 93, D8: 94, E8: 95, F8: 96, G8: 97, H8: 98,
  noSq: 99, offBoard: 100
};

//List of moves board has in given position
// let maxGameMoves = 2048;
//Possible moves to be generated;
// let maxPositionMoves = 256;
//Depth of moves engine searches
// let maxDepth = 64;


//Want to be able to return the square index for a particular rank and file
//ie. file1/rank1 = 21, file8/rank8 = 98
//Create empty array with a pre-defined length ie. filesBoardArr = [empty x 120];
//Different to array = [numBoardSq]

const filesBoardArr = new Array (numBoardSq);
const ranksBoardArr = new Array (numBoardSq);


//Starting FEN string
startingFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

//For ease of printing board to console
let pieceChar = ".PNBRQKpnbrqk";
let sideChar = "wb-";
let rankChar = "12345678";
let fileChar = "ABCDEFGH";

//To get the relevant square number, pass file and rank as arguments
const getSquare = function (file, rank) {
  return ( (21 + (file) ) + ( (rank) * 10 ) );
};

//Generate 4 random numbers filling 8 bits, 3 have been shift varying amounts to get a good coverage of the 31 bits
//To allocate position keys
const randomNumber32bit = function () {

	return (Math.floor((Math.random()*32)+1) << 23) | (Math.floor((Math.random()*32)+1) << 16)
		 | (Math.floor((Math.random()*32)+1) << 8) | Math.floor((Math.random()*32)+1);

};


//Arrays to store the keys generated
//piece * 120 + sq --> unique # for each piece and square
//for enPasant 0 * 120 + sq, as wP starts from 1
const pieceKeys = new Array(14 * 120);
const castleKeys = new Array(16); // 0-1111

let sideKeys;

// const 120to64sq = new Array(numBoardSq);
// const 64to120sq = new Array(64);

//variables correspond to pieces{}
//Values of each piece
const pieceVal = [0, 100, 325, 325, 550, 1000, 50000, 100, 325, 325, 550, 1000, 50000];
const pieceCol = [ colors.both, colors.white, colors.white, colors.white, colors.white, colors.white, colors.white,
	colors.black, colors.black, colors.black, colors.black, colors.black, colors.black ];


const nonPawn = [ false, false, true, true, true, true, true, false, true, true, true, true, true ];
//Major pieces: rook, queen, king
const majPiece = [ false, false, false, false, true, true, true, false, false, false, true, true, true ];
//Minor pieces: knight, bishops
const minPiece = [ false, false, true, true, false, false, false, false, true, true, false, false, false ];

//ways to move
const pawn = [ false, true, false, false, false, false, false, true, false, false, false, false, false ];
const knight = [ false, false, true, false, false, false, false, false, true, false, false, false, false ];
const king = [ false, false, false, false, false, false, true, false, false, false, false, false, true ];
const rookQueen = [ false, false, false, false, true, true, false, false, false, false, true, true, false ];
const bishopQueen = [ false, false, false, true, false, true, false, false, false, true, false, true, false ];
const slides = [ false, false, false, true, true, true, false, false, false, true, true, true, false ];
