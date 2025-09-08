import React from 'react';
import Tetris from 'react-tetris';

function HomePage() {
  return (
    <div className="tetris-container">
      <h1>Bem-vindo! Que tal uma partida de Tetris?</h1>

      {/* Adicionamos a div com a className "game-area" aqui */}
      <div className="game-area"> 
        <Tetris>
          {({ Gameboard, points, lines, level, state, controller }) => (
            <div>
              {/* O placar pode ficar fora do Gameboard, mas dentro da lógica */}
              <div className="game-score">
                <p>Pontos: {points}</p>
                <p>Linhas: {lines}</p>
                <p>Nível: {level}</p>
              </div>

              {/* O Gameboard é o componente visual do jogo */}
              <Gameboard />

              {state === 'lost' && (
                <div>
                  <h2>Fim de Jogo!</h2>
                  <button onClick={controller.restart}>
                    Jogar Novamente
                  </button>
                </div>
              )}
            </div>
          )}
        </Tetris>
      </div>
    </div>
  );
}

export default HomePage;