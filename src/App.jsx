// Importando Bibliotecas
import { useCallback, useEffect, useState } from 'react';

// Importando Styles / Css
import './App.css';

// Importando Data
import { WorldList } from './data/World';
import correctSound from './music/correct.mp3';
import errorSound from './music/error.mp3';

// Importando Componentes
import StartScreen from './Components/StartScreen';
import Game from './Components/Game';
import GameOver from './Components/GameOver';

function App() {
  // Definição dos "Stages" para controle de telas
  const stages = [
    { id: 1, name: "start" },
    { id: 2, name: "game" },
    { id: 3, name: "end" },
  ];

  // Controle do estado do jogo
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [picked, setPicked] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letter, setLetter] = useState([]);
  const [guessedletter, setGuessedLetter] = useState([]);
  const [lettersError, setLettersError] = useState([]);
  const [score, setScore] = useState(0);
  const [chance, setChance] = useState(5);
  const [bestScore, setBestScore] = useState(0);
  const [correctWords, setCorrectWords] = useState([]);

  // Função para atualizar o melhor score
  const updateBestScore = () => {
    if (score > bestScore) {
      setBestScore(score);
    }
  };

  // Função para limpar os estados das letras
  const clearLetterStates = () => {
    setGuessedLetter([]);
    setLettersError([]);
  };

  // Função para tocar a música quando a letra for correta
  const playCorrectSound = () => {
    const audio = new Audio(correctSound);
    audio.play();
  };

  // Função para tocar a música quando a letra for errada
  const playIncorrectSound = () => {
    const audio = new Audio(errorSound);
    audio.play();
  };

  // Função para escolher uma categoria e palavra aleatória
  const pickedCategoriandList = () => {
    const categories = Object.keys(WorldList);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const word = WorldList[category][Math.floor(Math.random() * WorldList[category].length)];
    return { category, word };
  };

  // Função para iniciar o jogo
  const startGame = useCallback(() => {
    clearLetterStates();
    const { category, word } = pickedCategoriandList();
    const wordletter = word.split("").map((l) => l.toLowerCase());
    setPickedCategory(category);
    setPicked(word);
    setLetter(wordletter);
    setGameStage(stages[1].name);
  }, [pickedCategoriandList]);

  // Função para verificar o progresso do jogo
  const verifyGame = (inputLetter) => {
    const normalizedLetter = inputLetter.toLowerCase();

    if (guessedletter.includes(normalizedLetter) || lettersError.includes(normalizedLetter)) {
      return;
    }

    if (letter.includes(normalizedLetter)) {
      setGuessedLetter((actualGuessedLetter) => [...actualGuessedLetter, normalizedLetter]);
      playCorrectSound();
    } else {
      setLettersError((actualLettersError) => [...actualLettersError, normalizedLetter]);
      setChance((actualChance) => actualChance - 1);
      playIncorrectSound();
    }
  };

  // Função para reiniciar o jogo
  const restartGame = () => {
    setChance(5);
    setScore(0);
    setCorrectWords([]);
    setGameStage(stages[0].name);
  };

  // Efeitos do jogo

  // Atualiza a pontuação e começa um novo jogo quando todas as letras forem adivinhadas
  useEffect(() => {
    const uniqueLetter = [...new Set(letter)];

    if (uniqueLetter.length === guessedletter.length) {
      setScore((actualScore) => actualScore + 100);
      setCorrectWords((prevWords) => [...prevWords, picked]);
      startGame();
    }
  }, [guessedletter, letter, startGame]);

  // Termina o jogo quando as chances acabarem
  useEffect(() => {
    if (chance === 0) {
      clearLetterStates();
      updateBestScore();
      setGameStage(stages[2].name);
    }
  }, [chance]);

  // Efeito inicial para configurar o jogo
  useEffect(() => {
    setGameStage(stages[0].name);
    setChance(5);
    setScore(0);
  }, []);

  return (
    <>
      <h1>Show do Milhão</h1>

      {/* Controle de tela com base no "gameStage" */}
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyGame={verifyGame}
          picked={picked}
          pickedCategory={pickedCategory}
          letter={letter}
          lettersError={lettersError}
          score={score}
          chance={chance}
          guessedletter={guessedletter}
          bestScore={bestScore}
        />
      )}
      {gameStage === "end" && (
        <GameOver
          restartGame={restartGame}
          score={score}
          bestScore={bestScore}
          correctWords={correctWords}
        />
      )}
    </>
  );
}

export default App;
