import { MessageSquareText } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-[#1E3A5F] via-[#2563EB] to-[#3B82F6] text-white py-12 sm:py-16 pb-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 mb-5">
          <MessageSquareText className="w-7 h-7 text-white" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
          Fale com o Gabinete
        </h2>

        <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Sua voz é essencial para construirmos juntos um estado melhor. Preencha o formulário
          abaixo e nossa equipe técnica dará o encaminhamento necessário.
        </p>
      </div>
    </section>
  )
}
