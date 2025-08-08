import { useState, useEffect } from 'react'
import { TarotCard } from './components/TaroCard'

const GameState = {
  INITIAL: 'initial',
  SPINNING: 'spinning',
  SELECTED: 'selected',
  REVEALED: 'revealed'
} as const

type GameStateType = typeof GameState[keyof typeof GameState]

const questions = [
  "가장 기억에 남는 여행지는 어디인가요?",
  "어릴 때 꿈꿨던 직업은 무엇이었나요?",
  "가장 좋아하는 음식과 그 이유는?",
  "스트레스를 받을 때 어떻게 해소하나요?",
  "가장 소중한 추억은 무엇인가요?",
  "10년 후 자신의 모습을 상상해보세요",
  "가장 감동받았던 영화나 책은?",
  "친구들과 함께 하고 싶은 활동은?",
  "가장 자랑스러운 순간은 언제였나요?",
  "새로운 취미를 시작한다면 무엇을 해보고 싶나요?",
  "가장 무서웠던 경험은 무엇인가요?",
  "완벽한 하루를 보낸다면 어떻게 보내고 싶나요?",
  "가장 존경하는 사람과 그 이유는?",
  "어떤 초능력을 갖고 싶나요?",
  "가장 후회하는 일이 있다면?",
  "행복한 순간은 언제인가요?",
  "가장 좋아하는 계절과 이유는?",
  "어떤 동물과 가장 닮았다고 생각하나요?",
  "가장 듣고 싶은 말은 무엇인가요?",
  "인생에서 가장 중요한 가치는 무엇인가요?"
]

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
          }, 500)
          
          return 0
        }
        return newSpeed
      })
    }, 100)
  }

  const handleCardSelect = () => {
    if (gameState === GameState.SELECTED) {
      setGameState(GameState.REVEALED)
    }
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
          onClick={gameState === GameState.SELECTED ? handleCardSelect : undefined}
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
            <h1 className="text-xl md:text-2xl font-bold mb-4 px-4">카드를 터치하여 뽑아보세요</h1>
          )}
          {gameState === GameState.SPINNING && (
            <h1 className="text-xl md:text-2xl font-bold mb-4 px-4">카드를 섞고 있습니다...</h1>
          )}
          {gameState === GameState.SELECTED && (
            <h1 className="text-xl md:text-2xl font-bold mb-4 px-4">카드를 선택하려면 한 번 더 터치하세요</h1>
          )}
          {gameState === GameState.REVEALED && (
            <h1 className="text-xl md:text-2xl font-bold mb-4 px-4">{selectedQuestion}</h1>
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
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded-full text-lg font-semibold shadow-lg hover:from-pink-600 hover:to-pink-500 transition-all transform hover:scale-105 active:scale-95"
            >
              질문 뽑기
            </button>
          )}
          
          {gameState === GameState.REVEALED && (
            <div className="space-y-3">
              <button
                onClick={handleReset}
                className="w-full py-3 bg-gray-700 text-white rounded-full text-sm font-medium hover:bg-gray-600 transition-colors border border-gray-600"
              >
                다시 뽑기
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* 하단 인디케이터 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full opacity-30"></div>
    </div>
  )
}
