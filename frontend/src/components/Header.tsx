import { BadgeCheck } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-[#1E3A5F] text-white shadow-lg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
        {/* Deputy photo */}
        <img
          src="/andre_bueno.png"
          alt="Deputado Estadual André Bueno"
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover object-top border-2 border-white/30 shrink-0"
        />

        {/* Name and subtitle */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight truncate">
              Deputado Estadual Andre Bueno
            </h1>
            <BadgeCheck className="w-5 h-5 text-blue-300 shrink-0" />
          </div>
          <p className="text-sm text-blue-200 font-medium">
            Gabinete Parlamentar
          </p>
        </div>
      </div>
    </header>
  )
}
