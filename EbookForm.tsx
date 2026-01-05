'use client'

import { useState, FormEvent } from 'react'

interface EbookFormProps {
  onSubmit: (data: {
    topic: string
    chapters: number
    style?: string
    targetAudience?: string
  }) => void
  loading: boolean
}

export default function EbookForm({ onSubmit, loading }: EbookFormProps) {
  const [topic, setTopic] = useState('')
  const [chapters, setChapters] = useState(5)
  const [style, setStyle] = useState('')
  const [targetAudience, setTargetAudience] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({
      topic,
      chapters,
      style: style || undefined,
      targetAudience: targetAudience || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="topic"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Ebook Topic *
        </label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          placeholder="e.g., Introduction to Machine Learning"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="chapters"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Number of Chapters *
        </label>
        <input
          type="number"
          id="chapters"
          value={chapters}
          onChange={(e) => setChapters(parseInt(e.target.value) || 1)}
          required
          min="1"
          max="20"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="style"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Writing Style (Optional)
        </label>
        <select
          id="style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select a style</option>
          <option value="Professional">Professional</option>
          <option value="Casual">Casual</option>
          <option value="Academic">Academic</option>
          <option value="Conversational">Conversational</option>
          <option value="Technical">Technical</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="audience"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Target Audience (Optional)
        </label>
        <input
          type="text"
          id="audience"
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          placeholder="e.g., Beginners, Professionals, Students"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !topic}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
      >
        {loading ? 'Generating...' : 'Generate Ebook'}
      </button>
    </form>
  )
}

