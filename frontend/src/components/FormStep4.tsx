import { useRef, type DragEvent } from 'react'
import { Upload, X, FileText, Image, FileSpreadsheet, Video, Camera } from 'lucide-react'

interface FormStep4Props {
  file: File | null
  setFile: React.Dispatch<React.SetStateAction<File | null>>
}

const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.mov', '.pdf', '.doc', '.docx', '.xls', '.xlsx']
const MAX_SIZE_MB = 50
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

function getFileIcon(name: string) {
  const ext = name.split('.').pop()?.toLowerCase()
  if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'webp') {
    return <Image className="w-6 h-6 text-[#2563EB]" />
  }
  if (ext === 'mp4' || ext === 'mov') {
    return <Video className="w-6 h-6 text-purple-600" />
  }
  if (ext === 'xls' || ext === 'xlsx') {
    return <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
  }
  return <FileText className="w-6 h-6 text-red-500" />
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function FormStep4({ file, setFile }: FormStep4Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (newFiles: FileList | null) => {
    if (!newFiles || newFiles.length === 0) return

    const selected = newFiles[0]
    const ext = '.' + selected.name.split('.').pop()?.toLowerCase()

    if (!ACCEPTED_EXTENSIONS.includes(ext)) return
    if (selected.size > MAX_SIZE_BYTES) return

    setFile(selected)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    handleFile(e.dataTransfer.files)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
          <Camera className="w-5 h-5 text-[#2563EB]" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
          Foto ou Anexo
        </h3>
      </div>

      {file ? (
        /* Selected file preview */
        <div className="flex items-center gap-4 bg-gray-50 rounded-xl px-5 py-4 border border-gray-200">
          {getFileIcon(file.name)}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{file.name}</p>
            <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
          </div>
          <button
            type="button"
            onClick={() => setFile(null)}
            className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
            aria-label="Remover arquivo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        /* Drag & Drop Upload Area */
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          className="
            border-2 border-dashed border-amber-300 bg-amber-50/30 rounded-xl p-10
            flex flex-col items-center justify-center gap-4
            cursor-pointer transition-all duration-200
            hover:border-[#2563EB] hover:bg-blue-50/30
            group
          "
        >
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
            <Upload className="w-6 h-6 text-amber-600 group-hover:text-[#2563EB] transition-colors" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-800">
              Arraste o arquivo ou clique para anexar
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Foto, Vídeo, PDF, DOC, Excel — Máx. {MAX_SIZE_MB}MB (opcional, 1 arquivo)
            </p>
          </div>
          <button
            type="button"
            className="px-6 py-2.5 bg-[#1e293b] text-white text-sm font-bold rounded-lg uppercase tracking-wider hover:bg-[#0f172a] transition-colors cursor-pointer"
          >
            Selecionar Arquivo
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,.mp4,.mov,.pdf,.doc,.docx,.xls,.xlsx"
        onChange={(e) => handleFile(e.target.files)}
        className="hidden"
      />
    </div>
  )
}
