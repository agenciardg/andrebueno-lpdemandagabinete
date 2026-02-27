import type { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form'
import type { FormData } from '../lib/schema'
import { ClipboardList } from 'lucide-react'

interface FormStep3Props {
  register: UseFormRegister<FormData>
  errors: FieldErrors<FormData>
  watch: UseFormWatch<FormData>
}

const NATUREZA_OPTIONS = [
  'Atendimento Geral',
  'Educação',
  'Espaço Público',
  'Habitação',
  'Jurídico',
  'Legislativo',
  'Regularização',
  'Ruas e Bairros',
  'Saúde',
  'Segurança',
  'Serviço Social',
  'Falar com Deputado',
]

export default function FormStep3({ register, errors, watch }: FormStep3Props) {
  const detalhamento = watch('detalhamento') ?? ''
  const charCount = detalhamento.length

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
          <ClipboardList className="w-5 h-5 text-[#2563EB]" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
          Sua Solicitação
        </h3>
      </div>

      {/* Natureza + Protocolo - side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="natureza" className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
            Natureza da Solicitação <span className="text-red-500">*</span>
          </label>
          <select
            id="natureza"
            className={`
              w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900
              transition-all duration-200 appearance-none cursor-pointer
              focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] focus:bg-white
              ${errors.natureza ? 'border-red-400 bg-red-50/50' : 'border-gray-200'}
            `}
            defaultValue=""
            {...register('natureza')}
          >
            <option value="" disabled>
              Selecione uma categoria
            </option>
            {NATUREZA_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.natureza && (
            <p className="mt-1.5 text-sm text-red-500">{errors.natureza.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="protocolo" className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
            Protocolo da Prefeitura
            <span className="ml-2 text-xs text-gray-400 font-normal normal-case">(Opcional)</span>
          </label>
          <input
            id="protocolo"
            type="text"
            placeholder="Nº de protocolo existente"
            className="
              w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900
              transition-all duration-200 placeholder:text-gray-400
              focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] focus:bg-white
            "
            {...register('protocolo')}
          />
        </div>
      </div>

      {/* Assunto - full width */}
      <div>
        <label htmlFor="assunto" className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
          Assunto <span className="text-red-500">*</span>
        </label>
        <input
          id="assunto"
          type="text"
          placeholder="Resumo breve da solicitação (máx. 50 caracteres)"
          className={`
            w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900
            transition-all duration-200 placeholder:text-gray-400
            focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] focus:bg-white
            ${errors.assunto ? 'border-red-400 bg-red-50/50' : 'border-gray-200'}
          `}
          {...register('assunto')}
        />
        {errors.assunto && (
          <p className="mt-1.5 text-sm text-red-500">{errors.assunto.message}</p>
        )}
      </div>

      {/* Detalhamento - full width textarea */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="detalhamento" className="block text-xs font-bold text-gray-600 uppercase tracking-wider">
            Detalhamento da Demanda <span className="text-red-500">*</span>
          </label>
          <span
            className={`text-xs font-semibold ${
              charCount > 2000 ? 'text-red-500' : charCount > 1800 ? 'text-amber-500' : 'text-gray-400'
            }`}
          >
            {charCount} / 2000
          </span>
        </div>
        <textarea
          id="detalhamento"
          rows={6}
          placeholder="Descreva os detalhes da sua solicitação aqui. Quanto mais informações, melhor poderemos atendê-lo..."
          className={`
            w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900 resize-y
            transition-all duration-200 placeholder:text-gray-400
            focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] focus:bg-white
            ${errors.detalhamento ? 'border-red-400 bg-red-50/50' : 'border-gray-200'}
          `}
          {...register('detalhamento')}
        />
        {errors.detalhamento && (
          <p className="mt-1.5 text-sm text-red-500">{errors.detalhamento.message}</p>
        )}
      </div>
    </div>
  )
}
