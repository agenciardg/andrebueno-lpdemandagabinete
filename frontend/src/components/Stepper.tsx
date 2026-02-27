import { Check } from 'lucide-react'

interface StepperProps {
  currentStep: number
  steps: string[]
}

export default function Stepper({ currentStep, steps }: StepperProps) {
  return (
    <div className="w-full py-6 px-2">
      <div className="flex items-center justify-between relative">
        {steps.map((label, index) => {
          const isCompleted = index < currentStep
          const isActive = index === currentStep
          const isPending = index > currentStep

          return (
            <div key={label} className="flex flex-col items-center relative z-10 flex-1">
              {/* Connector line (not on first item) */}
              {index > 0 && (
                <div
                  className={`absolute top-5 right-1/2 w-full h-0.5 -z-10 transition-colors duration-300 ${
                    index <= currentStep ? 'bg-[#2563EB]' : 'bg-gray-200'
                  }`}
                />
              )}

              {/* Circle */}
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                  transition-all duration-300 shadow-sm
                  ${isCompleted
                    ? 'bg-emerald-500 text-white shadow-emerald-200'
                    : isActive
                      ? 'bg-[#2563EB] text-white shadow-blue-200 ring-4 ring-blue-100'
                      : isPending
                        ? 'bg-white text-gray-400 border-2 border-gray-200'
                        : ''
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" strokeWidth={3} />
                ) : (
                  index + 1
                )}
              </div>

              {/* Label */}
              <span
                className={`
                  mt-2 text-xs sm:text-sm font-medium transition-colors duration-300
                  ${isCompleted
                    ? 'text-emerald-600'
                    : isActive
                      ? 'text-[#2563EB]'
                      : 'text-gray-400'
                  }
                `}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
