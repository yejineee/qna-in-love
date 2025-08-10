'use client';

import { nl2br } from '@/lib/utils';

interface TarotCardProps {
  isFlipped?: boolean;
  isSelected?: boolean;
  isSpinning?: boolean;
  question?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  glowEffect?: boolean;
}

export function TarotCard({
  isFlipped = false,
  isSelected = false,
  isSpinning = false,
  question = '',
  style,
  onClick,
  glowEffect = false,
}: TarotCardProps) {
  return (
    <div
      className={`relative w-16 h-24 md:w-20 md:h-32 cursor-pointer transition-all duration-700 transform-gpu ${
        isSelected ? 'scale-110 z-30' : 'z-10'
      } ${isSpinning ? 'animate-pulse' : ''}`}
      style={style}
      onClick={onClick}
    >
      {/* 선택된 카드의 황금 후광 효과 */}
      {glowEffect && (
        <>
          <div className='absolute inset-0 bg-yellow-400 rounded-xl blur-xl opacity-60 scale-150 animate-pulse'></div>
          <div className='absolute inset-0 bg-yellow-300 rounded-xl blur-lg opacity-40 scale-125'></div>

          {/* 방사형 광선 효과 */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
            <div
              key={index}
              className='absolute top-1/2 left-1/2 w-1 h-32 bg-gradient-to-t from-yellow-400 to-transparent opacity-70 transform -translate-x-1/2 -translate-y-1/2 origin-bottom animate-pulse'
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                animationDelay: `${index * 0.1}s`,
              }}
            />
          ))}
        </>
      )}

      <div
        className={`relative w-full h-full transition-transform duration-1000 transform-3d ${isFlipped ? 'rotate-y-180 -translate-y-20 scale-500 md:scale-400' : ''}`}
      >
        {/* 카드 뒷면 */}
        <div className={`absolute inset-0 w-full h-full backface-hidden`}>
          <div className='w-full h-full bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800 rounded-xl shadow-2xl border-2 border-yellow-400 overflow-hidden'>
            {/* 외곽 테두리 장식 */}
            <div className='absolute inset-1 border border-yellow-400 rounded-lg opacity-80'></div>

            {/* 중앙 원형 패턴 */}
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <div className='relative w-6 h-6 md:w-8 md:h-8'>
                <div className='absolute inset-0 rounded-full border border-yellow-400 opacity-90'></div>
                <div className='absolute inset-1 rounded-full border border-yellow-300 opacity-70'></div>

                {/* 중앙 별 패턴 */}
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  <div className='relative w-2 h-2 md:w-3 md:h-3'>
                    {[0, 45, 90, 135].map((rotation, index) => (
                      <div
                        key={index}
                        className='absolute top-1/2 left-1/2 w-0.5 h-1.5 md:h-2 bg-yellow-300 transform -translate-x-1/2 -translate-y-full origin-bottom'
                        style={{
                          transform: `rotate(${rotation}deg)`,
                        }}
                      />
                    ))}
                    <div className='absolute top-1/2 left-1/2 w-0.5 h-0.5 md:w-1 md:h-1 bg-yellow-400 rounded-full transform -translate-x-1/2 -translate-y-1/2'></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 장식적 요소들 */}
            <div className='absolute top-1 left-1 w-1.5 h-1.5 md:w-2 md:h-2 border-l border-t border-yellow-400 opacity-70'></div>
            <div className='absolute top-1 right-1 w-1.5 h-1.5 md:w-2 md:h-2 border-r border-t border-yellow-400 opacity-70'></div>
            <div className='absolute bottom-1 left-1 w-1.5 h-1.5 md:w-2 md:h-2 border-l border-b border-yellow-400 opacity-70'></div>
            <div className='absolute bottom-1 right-1 w-1.5 h-1.5 md:w-2 md:h-2 border-r border-b border-yellow-400 opacity-70'></div>

            {/* 별 장식 */}
            <div className='absolute top-2 left-1/2 transform -translate-x-1/2 text-yellow-400 text-xs opacity-80'>
              ✦
            </div>
            <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 text-yellow-400 text-xs opacity-80'>
              ✦
            </div>
          </div>
        </div>

        {/* 카드 앞면 */}
        <div className='absolute inset-0 w-full h-full backface-hidden rotate-y-180'>
          <div className='w-full h-full bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 rounded-xl shadow-2xl border-2 border-amber-200 p-2 md:p-3 flex flex-col justify-center items-center text-center relative overflow-hidden'>
            {/* 종이 질감 효과 */}
            <div className='absolute inset-0 opacity-30'>
              <div
                className='absolute inset-0'
                style={{
                  backgroundImage: `
                  radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.1) 1px, transparent 1px),
                  radial-gradient(circle at 80% 70%, rgba(160, 82, 45, 0.08) 1px, transparent 1px),
                  radial-gradient(circle at 40% 80%, rgba(139, 69, 19, 0.06) 1px, transparent 1px),
                  radial-gradient(circle at 90% 20%, rgba(160, 82, 45, 0.05) 1px, transparent 1px)
                `,
                  backgroundSize: '8px 8px, 12px 12px, 6px 6px, 10px 10px',
                }}
              ></div>
            </div>

            {/* 장식적 테두리 */}
            <div className='absolute inset-1 border border-amber-300 rounded-lg opacity-60'></div>
            <div className='absolute inset-2 border border-amber-200 rounded-md opacity-40'></div>

            {/* 상단 장식 */}
            <div className='absolute top-2 left-1/2 transform -translate-x-1/2 flex items-center space-x-1'>
              <div className='w-3 h-0.5 bg-amber-400 opacity-60'></div>
              <div className='text-amber-300 text-xs'>✦</div>
              <div className='w-3 h-0.5 bg-amber-400 opacity-60'></div>
            </div>

            {/* 메인 컨텐츠 */}
            <div className='relative z-10 flex flex-col items-center justify-center h-full'>
              <p className='text-amber-900 text-[4px] md:text-[6px] font-semibold leading-relaxed px-1 break-keep'>
                {nl2br(question)}
              </p>
            </div>

            {/* 하단 장식 */}
            <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center space-x-1'>
              <div className='w-3 h-0.5 bg-amber-400 opacity-60'></div>
              <div className='text-amber-300 text-xs'>✦</div>
              <div className='w-3 h-0.5 bg-amber-400 opacity-60'></div>
            </div>

            {/* 모서리 장식 */}
            <div className='absolute top-1 left-1 w-2 h-2 border-l-2 border-t-2 border-amber-400 opacity-50 rounded-tl'></div>
            <div className='absolute top-1 right-1 w-2 h-2 border-r-2 border-t-2 border-amber-400 opacity-50 rounded-tr'></div>
            <div className='absolute bottom-1 left-1 w-2 h-2 border-l-2 border-b-2 border-amber-400 opacity-50 rounded-bl'></div>
            <div className='absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-amber-400 opacity-50 rounded-br'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
