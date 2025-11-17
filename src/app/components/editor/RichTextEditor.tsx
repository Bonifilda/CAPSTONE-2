'use client'

import { useMemo, useRef } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import Jodit to avoid SSR issues
const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 rounded-lg animate-pulse"></div>
})

interface RichTextEditorProps {
  value: string
  onChange: (content: string) => void
  placeholder?: string
}

export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = 'Start writing your story...' 
}: RichTextEditorProps) {
  const editorRef = useRef(null)

  // Simplified config that should work without type issues
  const config = useMemo(() => ({
    readonly: false,
    placeholder,
    buttons: [
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'ul', 'ol', '|',
      'outdent', 'indent', '|',
      'font', 'fontsize', 'brush', '|',
      'image', 'link', '|',
      'align', '|',
      'undo', 'redo', '|',
      'preview'
    ],
    height: 500,
  }), [placeholder])

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <JoditEditor
        ref={editorRef}
        value={value}
        config={config}
        onBlur={(newContent: string) => onChange(newContent)}
      />
    </div>
  )
}