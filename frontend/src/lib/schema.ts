import { z } from 'zod/v4'

// Step 1 - Dados Pessoais
export const step1Schema = z.object({
  nome: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres.'),
  email: z
    .string()
    .email('Informe um e-mail valido.'),
  whatsapp: z
    .string()
    .min(14, 'Informe um numero de celular valido.'),
  nascimento: z
    .string()
    .min(10, 'Informe uma data valida (DD/MM/AAAA).'),
  indicacao: z
    .string()
    .optional(),
})

// Step 2 - Endereco
export const step2Schema = z.object({
  cep: z
    .string()
    .min(9, 'Informe um CEP valido.'),
  logradouro: z
    .string()
    .min(3, 'Logradouro deve ter pelo menos 3 caracteres.'),
  bairro: z
    .string()
    .min(2, 'Bairro deve ter pelo menos 2 caracteres.'),
  cidade: z
    .string()
    .min(2, 'Cidade deve ter pelo menos 2 caracteres.'),
  uf: z
    .string()
    .length(2, 'UF deve ter exatamente 2 caracteres.'),
  latitude: z
    .string()
    .optional(),
  longitude: z
    .string()
    .optional(),
})

// Step 3 - Solicitacao
export const step3Schema = z.object({
  natureza: z
    .string()
    .min(1, 'Selecione a natureza da solicitacao.'),
  protocolo: z
    .string()
    .optional(),
  assunto: z
    .string()
    .min(3, 'Assunto deve ter pelo menos 3 caracteres.'),
  detalhamento: z
    .string()
    .min(10, 'Detalhamento deve ter pelo menos 10 caracteres.')
    .max(2000, 'Detalhamento deve ter no maximo 2000 caracteres.'),
})

// Step 4 - LGPD
export const step4Schema = z.object({
  lgpd: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Voce deve concordar com a Politica de Privacidade.',
    }),
})

// Full form schema combining all steps
export const formSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
  ...step4Schema.shape,
})

export type FormData = z.infer<typeof formSchema>

// Step schemas array for per-step validation
export const stepSchemas = [step1Schema, step2Schema, step3Schema, step4Schema] as const
