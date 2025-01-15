import './GameOver.css';

const GameOver = ({ restartGame, score, bestScore, correctWords }) => {
  return (
    <div>
      {/* Título do jogo */}
      <h2>Game Over!</h2>

      <div className='InfoEnd'>
        {/* Seção de pontuação */}
        <span className='SpanPointsEnd'>Pontos: </span>
        <input className='InputPointsEnd' value={score || ""} readOnly />

        {/* Seção de melhor pontuação */}
        <span className='SpanBestScore'>Melhor: </span>
        <input className='BestScore' value={bestScore || ""} readOnly />
        
        {/* Exibição das palavras adivinhadas corretamente */}
        <h3>Palavras adivinhadas corretamente:</h3>
        {correctWords.length > 0 ? (
          <ul>
            {/* Lista de palavras corretas */}
            {correctWords.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma palavra foi adivinhada.</p>
        )}
      </div>

      {/* Botão para reiniciar o jogo */}
      <button className='btnReset' onClick={restartGame}>Restart Game</button>
    </div>
  );
};

export default GameOver;
