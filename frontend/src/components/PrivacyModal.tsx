import { X, ShieldCheck } from 'lucide-react'

interface PrivacyModalProps {
  open: boolean
  onClose: () => void
}

export default function PrivacyModal({ open, onClose }: PrivacyModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#1E3A5F] text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6" />
            <h2 className="text-lg font-bold">Política de Privacidade</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 py-6 space-y-6 text-sm text-gray-700 leading-relaxed">

          <p className="text-xs text-gray-400">
            Última atualização: fevereiro de 2026
          </p>

          {/* 1 */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">1. Informações Gerais</h3>
            <p>
              Esta Política de Privacidade descreve como os dados pessoais fornecidos por você,
              usuário, são coletados, utilizados e protegidos ao utilizar este portal de atendimento.
              O tratamento de dados ocorre de forma total ou parcialmente automatizada, em
              conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018).
            </p>
            <p className="mt-2">
              Ao utilizar este portal e submeter suas informações, você declara estar ciente e de
              acordo com os termos descritos nesta política.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">2. Dados Coletados</h3>
            <p>Para viabilizar o atendimento à sua demanda, coletamos os seguintes dados:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
              <li><strong>Dados de identificação:</strong> nome completo, data de nascimento e e-mail — utilizados para identificar o solicitante e manter comunicação.</li>
              <li><strong>Dados de contato:</strong> número de WhatsApp/celular — utilizado para retorno e acompanhamento da demanda.</li>
              <li><strong>Dados de localização:</strong> CEP, logradouro, bairro, cidade e UF — utilizados para identificar a região da demanda e direcionar ao órgão competente.</li>
              <li><strong>Dados da solicitação:</strong> natureza, assunto e detalhamento — utilizados para compreender e encaminhar adequadamente sua demanda.</li>
              <li><strong>Documentos e anexos:</strong> fotos, PDFs e outros arquivos enviados voluntariamente para complementar a solicitação.</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">3. Finalidade do Tratamento</h3>
            <p>Seus dados pessoais são utilizados exclusivamente para:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
              <li>Registrar e protocolar sua demanda junto ao gabinete parlamentar.</li>
              <li>Encaminhar sua solicitação aos órgãos públicos competentes (secretarias, unidades de saúde, educação, infraestrutura, entre outros).</li>
              <li>Manter contato para informar sobre o andamento e resolução da demanda.</li>
              <li>Gerar estatísticas internas para melhoria do atendimento à população.</li>
              <li>Enviar comunicações, divulgações, informativos e conteúdos relacionados às atividades parlamentares e de interesse público.</li>
              <li>Realizar pesquisas de opinião e satisfação sobre os serviços prestados.</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">4. Seus Direitos</h3>
            <p>
              Em conformidade com a LGPD, você tem direito a:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
              <li><strong>Confirmação e acesso:</strong> saber se seus dados estão sendo tratados e acessar as informações armazenadas.</li>
              <li><strong>Correção:</strong> solicitar a retificação de dados incompletos, inexatos ou desatualizados.</li>
              <li><strong>Eliminação:</strong> solicitar a exclusão dos seus dados pessoais, salvo quando houver obrigação legal de conservação.</li>
              <li><strong>Revogação do consentimento:</strong> retirar sua autorização de tratamento a qualquer momento.</li>
              <li><strong>Portabilidade:</strong> solicitar a transferência dos seus dados a outro controlador.</li>
              <li><strong>Oposição:</strong> opor-se ao tratamento quando realizado em desconformidade com a lei.</li>
            </ul>
            <p className="mt-2">
              Para exercer qualquer um desses direitos, entre em contato com a equipe do gabinete
              pelos canais de atendimento disponíveis.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">5. Compartilhamento de Dados</h3>
            <p>
              Seus dados pessoais <strong>não são compartilhados com terceiros</strong> para fins comerciais.
              O compartilhamento ocorre exclusivamente quando necessário para o encaminhamento da sua
              demanda, podendo ser direcionado a:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
              <li>Secretarias e órgãos da Administração Pública municipal e estadual.</li>
              <li>Unidades de saúde, educação e demais equipamentos públicos.</li>
              <li>Autoridades competentes, mediante ofício formal, quando aplicável.</li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">6. Segurança dos Dados</h3>
            <p>
              Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais
              contra acessos não autorizados, destruição, perda, alteração ou qualquer forma de
              tratamento indevido.
            </p>
            <p className="mt-2">
              Em caso de incidente de segurança que possa gerar risco aos titulares,
              nos comprometemos a comunicar os envolvidos e a Autoridade Nacional de Proteção de
              Dados (ANPD), conforme determina a legislação vigente.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">7. Prazo de Conservação</h3>
            <p>
              Os dados pessoais serão mantidos pelo período necessário ao atendimento da sua demanda
              e cumprimento de obrigações legais. Após esse período, os dados serão eliminados ou
              anonimizados para fins estatísticos.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">8. Alterações nesta Política</h3>
            <p>
              Esta política poderá ser atualizada a qualquer momento para refletir melhorias nos
              processos de tratamento de dados. Recomendamos a consulta periódica desta página.
              A continuidade de uso do portal após eventuais alterações implica a concordância com
              os novos termos.
            </p>
          </section>

          {/* Consentimento */}
          <section className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <h3 className="text-base font-bold text-gray-900 mb-2">Seu Consentimento</h3>
            <p>
              Ao marcar a caixa de consentimento no formulário de registro de demandas, você declara
              que leu, compreendeu e concorda com os termos desta Política de Privacidade, autorizando
              o tratamento dos seus dados pessoais para as finalidades aqui descritas.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#2563EB] text-white rounded-xl font-semibold hover:bg-[#1E3A5F] transition-colors cursor-pointer"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  )
}
