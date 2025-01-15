import React from 'react'

const StartScreen = ({startGame}) => {
  return (
    <div>
       
        <h2>Tela Inicial</h2>

        {/* Botão para Iniciar o Jogo */}

        <button onClick={startGame}>Start Game</button>

    </div>
  )
}
 
export default StartScreen