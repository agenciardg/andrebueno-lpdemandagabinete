import { CheckCircle2, RotateCcw, FileCheck } from 'lucide-react'

interface SuccessMessageProps {
  protocolo: string
  onReset: () => void
}

export default function SuccessMessage({ protocolo, onReset }: SuccessMessageProps) {
  return (
    <div className="animate-fade-in-up text-center py-10 px-6">
      {/* Success icon */}
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 mb-6">
        <CheckCircle2 className="w-10 h-10 text-emerald-500" strokeWidth={2} />
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
        Protocolo Registrado com Sucesso!
      </h2>

      {/* Protocol number */}
      <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-6 py-3 mb-6">
        <FileCheck className="w-5 h-5 text-emerald-600" />
        <span className="text-sm text-gray-600">Seu numero de protocolo:</span>
        <span className="font-bold text-emerald-700 text-lg">{protocolo}</span>
      </div>

      <p className="text-gray-600 max-w-md mx-auto leading-relaxed mb-2">
        Nossa equipe tecnica analisara sua demanda e dara o encaminhamento
        aos orgaos competentes.
      </p>

      <p className="text-sm text-gray-500 mb-8">
        Voce recebera atualizacoes por e-mail e WhatsApp.
      </p>

      {/* Reset button */}
      <button
        type="button"
        onClick={onReset}
        className="
          inline-flex items-center gap-2 px-8 py-3 rounded-xl
          bg-[#2563EB] text-white font-semibold
          hover:bg-[#1E3A5F] transition-colors duration-200
          shadow-lg shadow-blue-500/20 cursor-pointer
        "
      >
        <RotateCcw className="w-5 h-5" />
        Registrar Nova Demanda
      </button>
    </div>
  )
}
