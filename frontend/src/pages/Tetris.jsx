import React, { useRef, useEffect } from 'react';
import './Tetris.css'; 

function Tetris() {
  const gameBoardRef = useRef(null); 


  useEffect(() => {
    const board = gameBoardRef.current; 
    if (!board) return;
    const BOARD_WIDTH = 10;
    const BOARD_HEIGHT = 20;
    let gameBoard = [];

    const PIECES = [
        { shape: [[1, 1, 1, 1]], name: 'I' }, // I
        { shape: [[1, 0, 0], [1, 1, 1]], name: 'L' }, // L
        { shape: [[0, 0, 1], [1, 1, 1]], name: 'J' }, // J
        { shape: [[1, 1], [1, 1]], name: 'O' },      // O
        { shape: [[0, 1, 1], [1, 1, 0]], name: 'S' }, // S
        { shape: [[0, 1, 0], [1, 1, 1]], name: 'T' }, // T
        { shape: [[1, 1, 0], [0, 1, 1]], name: 'Z' }  // Z
    ];

    let currentPiece;

    function createBoard() {
        for (let row = 0; row < BOARD_HEIGHT; row++) {
            gameBoard[row] = [];
            for (let col = 0; col < BOARD_WIDTH; col++) {
                gameBoard[row][col] = 0;
            }
        }
    }

    function createPiece() {
        const piece = PIECES[Math.floor(Math.random() * PIECES.length)];
        currentPiece = {
            ...piece,
            x: Math.floor(BOARD_WIDTH / 2) - 1,
            y: 0
        };
    }

    function draw() {
        board.innerHTML = '';
        for (let row = 0; row < BOARD_HEIGHT; row++) {
            for (let col = 0; col < BOARD_WIDTH; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                if (gameBoard[row][col]) {
                    cell.classList.add(`piece-${gameBoard[row][col]}`);
                }
                board.appendChild(cell);
            }
        }
        currentPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    const boardX = currentPiece.x + x;
                    const boardY = currentPiece.y + y;
                    const cellIndex = boardY * BOARD_WIDTH + boardX;
                    if (board.children[cellIndex]) {
                       board.children[cellIndex].classList.add(`piece-${currentPiece.name}`);
                    }
                }
            });
        });
    }

    function movePiece(dir) {
        currentPiece.x += dir;
        if (checkCollision()) {
            currentPiece.x -= dir;
        }
        draw();
    }

    function dropPiece() {
        currentPiece.y++;
        if (checkCollision()) {
            currentPiece.y--;
            solidifyPiece();
        }
        draw();
    }

    function rotatePiece() {
        const originalShape = currentPiece.shape;
        const rotatedShape = currentPiece.shape[0].map((_, colIndex) =>
            currentPiece.shape.map(row => row[colIndex]).reverse()
        );
        currentPiece.shape = rotatedShape;
        if (checkCollision()) {
            currentPiece.shape = originalShape; 
        }
        draw();
    }

    function checkCollision() {
        for (let y = 0; y < currentPiece.shape.length; y++) {
            for (let x = 0; x < currentPiece.shape[y].length; x++) {
                if (currentPiece.shape[y][x]) {
                    const newX = currentPiece.x + x;
                    const newY = currentPiece.y + y;
                    if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT || (gameBoard[newY] && gameBoard[newY][newX])) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    function solidifyPiece() {
        currentPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    gameBoard[currentPiece.y + y][currentPiece.x + x] = currentPiece.name;
                }
            });
        });
        checkLines();
        createPiece();
    }

    function checkLines() {
        for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
            if (gameBoard[y].every(cell => cell !== 0)) {
                gameBoard.splice(y, 1);
                gameBoard.unshift(Array(BOARD_WIDTH).fill(0));
            }
        }
    }

    const handleKeyDown = (event) => {
        switch (event.keyCode) {
            case 37: movePiece(-1); break; // Esquerda
            case 39: movePiece(1); break; // Direita
            case 40: dropPiece(); break; // Baixo
            case 38: rotatePiece(); break; // Cima (Rotacionar)
        }
    };
    
    // Inicia o jogo
    createBoard();
    createPiece();
    draw();
    const gameInterval = setInterval(dropPiece, 1000);

    // Adiciona o listener de teclado
    document.addEventListener('keydown', handleKeyDown);

    // Função de limpeza: será executada quando o componente for "desmontado"
    return () => {
        document.removeEventListener('keydown', handleKeyDown);
        clearInterval(gameInterval);
    };
    // --- Fim da Lógica do Jogo ---

  }, []); // O array vazio [] garante que o useEffect rode apenas uma vez

  return (
    <div id="game-container">
      <h1>Block Puzzle</h1>
      {/* O ref conecta este div com a nossa referência (useRef) */}
      <div id="game-board" ref={gameBoardRef}></div>
    </div>
  );
}

export default Tetris;