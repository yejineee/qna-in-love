import { useState, useEffect } from 'react'
import { TarotCard } from './components/TaroCard'
import { nl2br } from './lib/utils'
import { questions } from './lib/question'
import './app.css'

const GameState = {
  INITIAL: 'initial',
  SPINNING: 'spinning',
  SELECTED: 'selected',
  REVEALED: 'revealed'
} as const

type GameStateType = typeof GameState[keyof typeof GameState]




export default function TarotQuestionApp() {
  const [gameState, setGameState] = useState<GameStateType>(GameState.INITIAL)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [selectedQuestion, setSelectedQuestion] = useState<string>('')
  const [cardRotations, setCardRotations] = useState<number[]>([])
  const [spinSpeed, setSpinSpeed] = useState(0)

  // 카드 초기 위치 설정
  useEffect(() => {
    const initialRotations = Array.from({ length: 7 }, (_, i) => (i - 3) * 25)
    setCardRotations(initialRotations)
  }, [])

    const handleCardSelect = (currentState: GameStateType) => {
    if (currentState === GameState.SELECTED) {
      setGameState(GameState.REVEALED)
    }
  }


  const startSpinning = () => {
    if (gameState !== GameState.INITIAL) return
    
    setGameState(GameState.SPINNING)
    setSpinSpeed(15)
    
    // 스피닝 애니메이션
    const spinInterval = setInterval(() => {
      setCardRotations(prev => prev.map(rotation => rotation + spinSpeed))
    }, 50)
    
    // 점진적으로 속도 감소
    const slowDownInterval = setInterval(() => {
      setSpinSpeed(prev => {
        const newSpeed = prev * 0.96
        if (newSpeed < 0.3) {
          clearInterval(spinInterval)
          clearInterval(slowDownInterval)
          
          // 카드 선택
          setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * questions.length)
            const randomQuestion = questions[randomIndex]
            setSelectedIndex(3) // 중앙 카드 선택
            setSelectedQuestion(randomQuestion)
            setGameState(GameState.SELECTED)

            setTimeout(() => {
              handleCardSelect(GameState.SELECTED)
            }, 1000)
          }, 50)
          
          return 0
        }
        return newSpeed
      })
    }, 10)
  }


  const handleReset = () => {
    setGameState(GameState.INITIAL)
    setSelectedIndex(null)
    setSelectedQuestion('')
    const initialRotations = Array.from({ length: 7 }, (_, i) => (i - 3) * 25)
    setCardRotations(initialRotations)
  }

  const renderCards = () => {
    const cards = []
    const totalCards = 7
    const centerX = 50
    const centerY = 65
    const radius = 28
    
    for (let i = 0; i < totalCards; i++) {
      const angle = (cardRotations[i] || 0) * (Math.PI / 180)
      const x = centerX + Math.sin(angle) * radius
      const y = centerY + Math.cos(angle) * radius * 0.4
      const rotation = cardRotations[i] || 0
      
      cards.push(
        <TarotCard
          key={i}
          isSelected={selectedIndex === i}
          isSpinning={gameState === GameState.SPINNING}
          isFlipped={gameState === GameState.REVEALED && selectedIndex === i}
          question={selectedIndex === i ? selectedQuestion : ''}
          glowEffect={gameState === GameState.SELECTED && selectedIndex === i}
          style={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            transform: `translate(-50%, -50%) rotate(${rotation * 0.3}deg)`,
            zIndex: selectedIndex === i ? 30 : 10 - Math.abs(i - 3)
          }}
        />
      )
    }
    
    return cards
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* 배경 그라데이션 효과 */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 opacity-80"></div>

      {/* 메인 컨텐츠 */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 pt-16 md:pt-4">
        {/* 제목 */}
        <div className="text-center mb-8 md:mb-12">
          {gameState === GameState.INITIAL && (
            <h1 className="text-2xl font-bold mb-4 px-4">카드를 뽑아보세요</h1>
          )}
          {gameState === GameState.REVEALED && (
            <h1 className="text-2xl font-bold mb-4 px-4 break-keep">{nl2br(selectedQuestion)}</h1>
          )}
        </div>
        
        {/* 카드 영역 */}
        <div className="relative w-full h-80 md:h-96 max-w-md">
          {renderCards()}
        </div>
        
        {/* 버튼 영역 */}
        <div className="mt-8 md:mt-12 w-full max-w-md px-4">
          {gameState === GameState.INITIAL && (
            <button
              onClick={startSpinning}
              className="w-full py-3 bg-gradient-to-r from-green-300 via-blue-500 to-indigo-400 text-white rounded-full text-lg font-semibold transition-all transform hover:scale-105 active:scale-95"
            >
              질문 뽑기
            </button>
          )}
          {gameState === GameState.REVEALED && (
              <button
                onClick={handleReset}
                className="w-full py-3 bg-gray-900 text-white rounded-full text-lg font-semibold transition-colors border border-indigo-300"
              >
                다시 뽑기
              </button>
          )}
        </div>
      </div>
    </div>
  )
}
