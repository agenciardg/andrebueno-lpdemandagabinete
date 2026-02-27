import type { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import type { FormData } from '../lib/schema'
import { maskPhone, maskDate } from '../utils/masks'
import { UserCircle } from 'lucide-react'

interface FormStep1Props {
  register: UseFormRegister<FormData>
  errors: FieldErrors<FormData>
  setValue: UseFormSetValue<FormData>
  watch: UseFormWatch<FormData>
}

export default function FormStep1({ register, errors, setValue, watch }: FormStep1Props) {
  const whatsappValue = watch('whatsapp') ?? ''
  const nascimentoValue = watch('nascimento') ?? ''

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
          <UserCircle className="w-5 h-5 text-[#2563EB]" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
          Dados Pessoais
        </h3>
      </div>

      {/* Nome Completo - full width */}
      <div>
        <label htmlFor="nome" className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
          Nome Completo <span className="text-red-500">*</span>
        </label>
        <input
          id="nome"
          type="text"
          placeholder="Insira seu nome completo"
          className={`
            w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900
            transition-all duration-200 placeholder:text-gray-400
            focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] focus:bg-white
            ${errors.nome ? 'border-red-400 bg-red-50/50' : 'border-gray-200'}
          `}
          {...register('nome')}
        />
        {errors.nome && (
          <p className="mt-1.5 text-sm text-red-500">{errors.nome.message}</p>
        )}
      </div>

      {/* E-mail + WhatsApp - side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
            E-mail <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="exemplo@email.com"
            className={`
              w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900
              transition-all duration-200 placeholder:text-gray-400
              focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] focus:bg-white
              ${errors.email ? 'border-red-400 bg-red-50/50' : 'border-gray-200'}
            `}
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="whatsapp" className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
            WhatsApp / Celular <span className="text-red-500">*</span>
          </label>
          <input
            id="whatsapp"
            type="tel"
            placeholder="(00) 00000-0000"
            value={whatsappValue}
            className={`
              w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900
              transition-all duration-200 placeholder:text-gray-400
              focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] focus:bg-white
              ${errors.whatsapp ? 'border-red-400 bg-red-50/50' : 'border-gray-200'}
            `}
            onChange={(e) => {
              setValue('whatsapp', maskPhone(e.target.value), { shouldValidate: false })
            }}
          />
          {errors.whatsapp && (
            <p className="mt-1.5 text-sm text-red-500">{errors.whatsapp.message}</p>
          )}
        </div>
      </div>

      {/* Data de Nascimento - half width */}
      <div className="max-w-sm">
        <label htmlFor="nascimento" className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
          Data de Nascimento <span className="text-red-500">*</span>
        </label>
        <input
          id="nascimento"
          type="text"
          placeholder="dd/mm/aaaa"
          value={nascimentoValue}
          className={`
            w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900
            transition-all duration-200 placeholder:text-gray-400
            focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] focus:bg-white
            ${errors.nascimento ? 'border-red-400 bg-red-50/50' : 'border-gray-200'}
          `}
          onChange={(e) => {
            setValue('nascimento', maskDate(e.target.value), { shouldValidate: false })
          }}
        />
        {errors.nascimento && (
          <p className="mt-1.5 text-sm text-red-500">{errors.nascimento.message}</p>
        )}
      </div>

      {/* Responsável pela Indicação - full width */}
      <div>
        <label htmlFor="indicacao" className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
          Responsável pela Indicação
          <span className="ml-2 text-xs text-gray-400 font-normal normal-case">(Opcional)</span>
        </label>
        <input
          id="indicacao"
          type="text"
          placeholder="Nome de quem indicou este portal"
          className="
            w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900
            transition-all duration-200 placeholder:text-gray-400
            focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] focus:bg-white
          "
          {...register('indicacao')}
        />
      </div>
    </div>
  )
}
