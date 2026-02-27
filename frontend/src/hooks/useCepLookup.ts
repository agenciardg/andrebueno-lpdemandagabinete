import { useState, useCallback } from 'react'
import { unmask } from '../utils/masks'

interface CepData {
  logradouro: string
  bairro: string
  cidade: string
  uf: string
  latitude: string
  longitude: string
}

interface UseCepLookupReturn extends CepData {
  loading: boolean
  error: string | null
  fetchCep: (cep: string) => Promise<void>
}

interface BrasilApiResponse {
  cep?: string
  state?: string
  city?: string
  neighborhood?: string
  street?: string
  service?: string
  location?: {
    type?: string
    coordinates?: {
      latitude?: string
      longitude?: string
    }
  }
  type?: string
  message?: string
}

interface NominatimResponse {
  lat: string
  lon: string
}

async function fetchLatLngFromNominatim(
  logradouro: string,
  cidade: string,
  uf: string
): Promise<{ lat: string; lng: string } | null> {
  try {
    const query = [logradouro, cidade, uf, 'Brazil'].filter(Boolean).join(', ')
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
      { headers: { 'Accept-Language': 'pt-BR' } }
    )

    if (!response.ok) return null

    const results: NominatimResponse[] = await response.json()

    if (results.length > 0 && results[0].lat && results[0].lon) {
      return { lat: results[0].lat, lng: results[0].lon }
    }

    return null
  } catch {
    return null
  }
}

export function useCepLookup(): UseCepLookupReturn {
  const [data, setData] = useState<CepData>({
    logradouro: '',
    bairro: '',
    cidade: '',
    uf: '',
    latitude: '',
    longitude: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCep = useCallback(async (cep: string) => {
    const digits = unmask(cep)

    if (digits.length !== 8) {
      setError('CEP deve conter 8 digitos.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${digits}`)

      if (!response.ok) {
        throw new Error('Erro ao consultar o CEP.')
      }

      const json: BrasilApiResponse = await response.json()

      if (json.type === 'service_error' || !json.cep) {
        setError('CEP nao encontrado.')
        setData({ logradouro: '', bairro: '', cidade: '', uf: '', latitude: '', longitude: '' })
        return
      }

      const logradouro = json.street ?? ''
      const bairro = json.neighborhood ?? ''
      const cidade = json.city ?? ''
      const uf = json.state ?? ''
      let latitude = json.location?.coordinates?.latitude ?? ''
      let longitude = json.location?.coordinates?.longitude ?? ''

      // Fallback: se a BrasilAPI não retornou lat/lng, busca no Nominatim
      if (!latitude || !longitude) {
        const nominatimResult = await fetchLatLngFromNominatim(logradouro, cidade, uf)
        if (nominatimResult) {
          latitude = nominatimResult.lat
          longitude = nominatimResult.lng
        }
      }

      setData({ logradouro, bairro, cidade, uf, latitude, longitude })
    } catch {
      setError('Erro ao consultar o CEP. Tente novamente.')
      setData({ logradouro: '', bairro: '', cidade: '', uf: '', latitude: '', longitude: '' })
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    ...data,
    loading,
    error,
    fetchCep,
  }
}
