import { useEffect, useRef } from 'react'
import type { FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import type { FormData } from '../lib/schema'
import { maskCep, unmask } from '../utils/masks'
import { useCepLookup } from '../hooks/useCepLookup'
import { MapPin, Search, Loader2 } from 'lucide-react'

interface FormStep2Props {
  errors: FieldErrors<FormData>
  setValue: UseFormSetValue<FormData>
  watch: UseFormWatch<FormData>
}

export default function FormStep2({ errors, setValue, watch }: FormStep2Props) {
  const cepValue = watch('cep') ?? ''
  const logradouroValue = watch('logradouro') ?? ''
  const bairroValue = watch('bairro') ?? ''
  const cidadeValue = watch('cidade') ?? ''
  const ufValue = watch('uf') ?? ''

  const { logradouro, bairro, cidade, uf, latitude, longitude, loading, error: cepError, fetchCep } = useCepLookup()
  const lastSearchedCep = useRef('')

  // Auto-search when CEP has 9 chars (with mask: 00000-000)
  useEffect(() => {
    const digits = unmask(cepValue)
    if (digits.length === 8 && cepValue !== lastSearchedCep.current) {
      lastSearchedCep.current = cepValue
      fetchCep(cepValue)
    }
  }, [cepValue, fetchCep])

  // Sync hook data → form values
  useEffect(() => {
    if (logradouro) setValue('logradouro', logradouro, { shouldValidate: true, shouldDirty: true })
    if (bairro) setValue('bairro', bairro, { shouldValidate: true, shouldDirty: true })
    if (cidade) setValue('cidade', cidade, { shouldValidate: true, shouldDirty: true })
    if (uf) setValue('uf', uf, { shouldValidate: true, shouldDirty: true })
    setValue('latitude', latitude || '', { shouldValidate: false })
    setValue('longitude', longitude || '', { shouldValidate: false })
  }, [logradouro, bairro, cidade, uf, latitude, longitude, setValue])

  const handleCepSearch = () => {
    lastSearchedCep.current = cepValue
    fetchCep(cepValue)
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
          <MapPin className="w-5 h-5 text-[#2563EB]" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
          Seu Endereço ou da Demanda
        </h3>
      </div>

      {/* CEP + Logradouro - side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4">
        <div>
          <label htmlFor="cep" className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
            CEP
          </label>
          <div className="relative">
            <input
              id="cep"
              type="text"
              placeholder="00000-000"
              value={cepValue}
              className={`
                w-full px-4 py-3 pr-12 rounded-xl border bg-gray-50 text-gray-900
                transition-all duration-200 placeholder:text-gray-400
                focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] focus:bg-white
                ${errors.cep ? 'border-red-400 bg-red-50/50' : 'border-gray-200'}
              `}
              onChange={(e) => {
                setValue('cep', maskCep(e.target.value), { shouldValidate: false })
              }}
            />
            <button
              type="button"
              onClick={handleCepSearch}
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-[#2563EB] transition-colors cursor-pointer"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.cep && (
            <p className="mt-1.5 text-sm text-red-500">{errors.cep.message}</p>
          )}
          {cepError && (
            <p className="mt-1.5 text-sm text-amber-600">{cepError}</p>
          )}
        </div>

        <div>
          <label htmlFor="logradouro" className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
            Logradouro <span className="text-red-500">*</span>
          </label>
          <input
            id="logradouro"
            type="text"
            placeholder="Busque o CEP para preencher"
            value={logradouroValue}
            onChange={(e) => setValue('logradouro', e.target.value, { shouldValidate: true })}
            className={`
              w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900
              transition-all duration-200 placeholder:text-gray-400
              focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] focus:bg-white
              ${errors.logradouro ? 'border-red-400 bg-red-50/50' : 'border-gray-200'}
            `}
          />
          {errors.logradouro && (
            <p className="mt-1.5 text-sm text-red-500">{errors.logradouro.message}</p>
          )}
        </div>
      </div>

      {/* Bairro / Comunidade */}
      <div className="max-w-lg">
        <label htmlFor="bairro" className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
          Bairro / Comunidade <span className="text-red-500">*</span>
        </label>
        <input
          id="bairro"
          type="text"
          placeholder="Busque o CEP para preencher"
          value={bairroValue}
          onChange={(e) => setValue('bairro', e.target.value, { shouldValidate: true })}
          className={`
            w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900
            transition-all duration-200 placeholder:text-gray-400
            focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] focus:bg-white
            ${errors.bairro ? 'border-red-400 bg-red-50/50' : 'border-gray-200'}
          `}
        />
        {errors.bairro && (
          <p className="mt-1.5 text-sm text-red-500">{errors.bairro.message}</p>
        )}
      </div>

      {/* Cidade/UF */}
      <div>
        <label htmlFor="cidade" className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
          Cidade / UF
        </label>
        <div className="flex gap-2">
          <input
            id="cidade"
            type="text"
            placeholder="Busque o CEP para preencher"
            readOnly
            value={cidadeValue}
            className={`
              flex-1 px-4 py-3 rounded-xl border bg-gray-100 text-gray-900
              transition-all duration-200 placeholder:text-gray-400
              ${errors.cidade ? 'border-red-400 bg-red-50/50' : 'border-gray-200'}
            `}
          />
          <input
            id="uf"
            type="text"
            placeholder="UF"
            readOnly
            maxLength={2}
            value={ufValue}
            className={`
              w-16 px-3 py-3 rounded-xl border bg-gray-100 text-gray-900 uppercase text-center
              transition-all duration-200 placeholder:text-gray-400
              ${errors.uf ? 'border-red-400 bg-red-50/50' : 'border-gray-200'}
            `}
          />
        </div>
      </div>
    </div>
  )
}
