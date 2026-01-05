'use client'

import { useState } from 'react'
import EbookForm from './EbookForm'
import EbookPreview from './EbookPreview'
import { EbookData } from '@/types/ebook'

export default function EbookGenerator() {
  const [ebook, setEbook] = useState<EbookData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async (formData: {
    topic: string
    chapters: number
    style?: string
    targetAudience?: string
  }) => {
    setLoading(true)
    setError(null)
    setEbook(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate ebook')
      }

      setEbook(data.ebook)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Generate Your Ebook
          </h2>
          <EbookForm onSubmit={handleGenerate} loading={loading} />
          {error && (
            <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 rounded">
              {error}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Preview
          </h2>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-4 text-gray-600 dark:text-gray-300">
                Generating your ebook...
              </span>
            </div>
          ) : ebook ? (
            <EbookPreview ebook={ebook} />
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              Your generated ebook will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

