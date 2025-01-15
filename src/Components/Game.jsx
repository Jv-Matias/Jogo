import { useState, useRef } from 'react';
import './Game.css';

const Game = ({ pickedCategory, letter, guessedletter, lettersError, score, chance, verifyGame }) => {

  const [letters, setLetters] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyGame(letters);
    setLetters("");
    letterInputRef.current.focus();
  };

  return (
    <div>
      <h2>Game Show</h2>

      {/* Cabeçalho do jogo */}
      <div className='ConteinerHeard'>
        <span>A Dica é:</span>
        <input className='InputWordTip' value={pickedCategory || ""} readOnly />

        <span className='SpanPoints'>Pontos: </span>
        <input className='InputPoints' value={score || ""} readOnly />

        <p>Você ainda possui:</p>
        <input className='InputAttempts' value={chance || ""} readOnly />
      </div>

      {/* Exibição das letras para formar a palavra */}
      <div className='ContainerWords'>
        {letter.map((char, i) => (
          guessedletter.includes(char) ? (
            <span key={i} className='SpanLetterGuessed'>{char}</span>
          ) : (
            <span key={i} className='SpanLetterNotGuessed'></span>
          )
        ))}
      </div>

      {/* Jogo e entrada de letra */}
      <div className='ContainerGamePlay'>
        <p>Por favor, digite a próxima letra!</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="InputLetterChoose"
            required
            value={letters}
            onChange={(e) => setLetters(e.target.value)}
            ref={letterInputRef}
          />
          <button className="ButtonSendLetter">Enviar!</button>
        </form>

        <h3>Letras já Utilizadas:</h3>
        <textarea 
          name="LetterError" 
          id="letterError" 
          value={lettersError.join(",")} 
          readOnly 
        />
      </div>
    </div>
  );
};

export default Game;
