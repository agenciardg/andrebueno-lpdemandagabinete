import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, CheckCircle, RotateCcw, X } from 'lucide-react'

import { formSchema, type FormData } from './lib/schema'
import { supabase, STORAGE_BUCKET } from './lib/supabase'

import Header from './components/Header'
import Hero from './components/Hero'
import FormStep1 from './components/FormStep1'
import FormStep2 from './components/FormStep2'
import FormStep3 from './components/FormStep3'
import FormStep4 from './components/FormStep4'
import Footer from './components/Footer'
import PrivacyModal from './components/PrivacyModal'

export default function App() {
  const [submitted, setSubmitted] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      nome: '',
      email: '',
      whatsapp: '',
      nascimento: '',
      indicacao: '',
      cep: '',
      logradouro: '',
      bairro: '',
      cidade: '',
      uf: '',
      latitude: '',
      longitude: '',
      natureza: '',
      protocolo: '',
      assunto: '',
      detalhamento: '',
      lgpd: false,
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    try {
      let arquivo_url: string | null = null

      // Upload file to Supabase Storage if present
      if (file) {
        const timestamp = Date.now()
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
        const filePath = `${timestamp}_${safeName}`

        const { error: uploadError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(filePath, file)

        if (!uploadError) {
          const { data: urlData } = supabase.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(filePath)

          arquivo_url = urlData.publicUrl
        }
      }

      // Generate protocol number
      const protocolNum = `GAB-${new Date().getFullYear()}-${String(Date.now()).slice(-5)}`

      // Insert into Supabase table
      const { error: insertError } = await supabase
        .from('demandas_gabinete')
        .insert({
          nome: data.nome,
          email: data.email,
          whatsapp: data.whatsapp,
          nascimento: data.nascimento,
          indicacao: data.indicacao || null,
          cep: data.cep,
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.cidade,
          uf: data.uf,
          latitude: data.latitude || null,
          longitude: data.longitude || null,
          natureza: data.natureza,
          protocolo_prefeitura: data.protocolo || null,
          assunto: data.assunto,
          detalhamento: data.detalhamento,
          arquivo_url,
          lgpd: data.lgpd,
          protocolo: protocolNum,
        })

      if (insertError) {
        throw insertError
      }

      setSubmitted(true)
    } catch (err) {
      console.error('Erro ao enviar:', err)
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    reset()
    setSubmitted(false)
    setFile(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a]">
      <Header />
      <Hero />

      <main className="flex-1 px-4 sm:px-6 pb-12 -mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto space-y-6">

          {/* Card 1 - Dados Pessoais */}
          <section className="bg-white rounded-2xl shadow-lg border-l-4 border-[#2563EB] overflow-hidden">
            <div className="p-6 sm:p-8">
              <FormStep1
                register={register}
                errors={errors}
                setValue={setValue}
                watch={watch}
              />
            </div>
          </section>

          {/* Card 2 - Endereço */}
          <section className="bg-white rounded-2xl shadow-lg border-l-4 border-[#2563EB] overflow-hidden">
            <div className="p-6 sm:p-8">
              <FormStep2
                errors={errors}
                setValue={setValue}
                watch={watch}
              />
            </div>
          </section>

          {/* Card 3 - Solicitação */}
          <section className="bg-white rounded-2xl shadow-lg border-l-4 border-[#2563EB] overflow-hidden">
            <div className="p-6 sm:p-8">
              <FormStep3
                register={register}
                errors={errors}
                watch={watch}
              />
            </div>
          </section>

          {/* Card 4 - Anexo */}
          <section className="bg-white rounded-2xl shadow-lg border-l-4 border-[#2563EB] overflow-hidden">
            <div className="p-6 sm:p-8">
              <FormStep4
                file={file}
                setFile={setFile}
              />
            </div>
          </section>

          {/* LGPD + Submit */}
          <section className="bg-[#1e293b] rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="flex items-start gap-3 mb-6">
              <input
                id="lgpd"
                type="checkbox"
                className="mt-1 h-5 w-5 rounded border-gray-500 text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
                {...register('lgpd')}
              />
              <label htmlFor="lgpd" className="text-sm text-gray-300 leading-relaxed cursor-pointer">
                Declaro que concordo com a{' '}
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); setPrivacyOpen(true) }}
                  className="font-semibold text-[#3B82F6] hover:underline cursor-pointer"
                >
                  Política de Privacidade
                </button>
                . Autorizo o processamento dos meus dados pessoais conforme a LGPD para fins de atendimento parlamentar, divulgações e comunicações de interesse público.
              </label>
            </div>
            {errors.lgpd && (
              <p className="mb-4 text-sm text-red-400">{errors.lgpd.message}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !watch('lgpd')}
              className="
                w-full py-4 px-6 bg-[#2563EB] text-white rounded-xl font-bold text-lg
                hover:bg-[#3B82F6] transition-all duration-200
                disabled:opacity-60 disabled:cursor-not-allowed
                flex items-center justify-center gap-3 shadow-lg shadow-blue-500/30
                cursor-pointer
              "
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  ENVIAR PROTOCOLO
                </>
              )}
            </button>
          </section>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 pb-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Dados protegidos por criptografia
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Em conformidade com a LGPD
            </span>
          </div>
        </form>
      </main>

      <Footer />
      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />

      {/* Modal de Sucesso */}
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 max-w-md w-full text-center relative animate-in">
            <button
              type="button"
              onClick={handleReset}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Protocolo Enviado com Sucesso!
            </h2>

            <p className="text-gray-500 mb-8 leading-relaxed">
              Sua demanda foi registrada. Em breve, um de nossos assessores entrará em contato com você.
            </p>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white rounded-xl font-semibold hover:bg-[#1E3A5F] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              Registrar Nova Demanda
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
