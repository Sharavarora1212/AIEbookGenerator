'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { EbookData } from '@/types/ebook'
import { exportToPDF } from '@/utils/pdfExport'

interface EbookPreviewProps {
  ebook: EbookData
}

export default function EbookPreview({ ebook }: EbookPreviewProps) {
  const [activeChapter, setActiveChapter] = useState(0)

  const handleExportPDF = async () => {
    await exportToPDF(ebook)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {ebook.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          by {ebook.author}
        </p>
      </div>

      <div className="mb-4 flex gap-2 flex-wrap">
        {ebook.chapters.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveChapter(index)}
            className={`px-3 py-1 rounded text-sm font-medium transition ${
              activeChapter === index
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Ch {index + 1}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            {ebook.chapters[activeChapter]?.title}
          </h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {ebook.chapters[activeChapter]?.content || ''}
          </ReactMarkdown>
        </div>
      </div>

      <button
        onClick={handleExportPDF}
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
      >
        Export as PDF
      </button>
    </div>
  )
}

