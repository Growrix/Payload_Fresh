'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface FileUploadProps {
  onFilesChange: (fileIds: string[]) => void
  maxFiles?: number
  maxSize?: number
  acceptedFileTypes?: string[]
}

interface UploadedFile {
  id: string
  name: string
  size: number
  url: string
}

export default function FileUpload({
  onFilesChange,
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024,
  acceptedFileTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
}: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string>('')

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (uploadedFiles.length + acceptedFiles.length > maxFiles) {
        const message = `Maximum ${maxFiles} files allowed. Please select fewer files.`
        // show popup for mistaken large selection
        try {
          window.alert(message)
        } catch (e) {
          setError(message)
        }
        setError(message)
        return
      }

      setIsUploading(true)
      setError('')

      try {
        const uploadPromises = acceptedFiles.map(async (file) => {
          const formData = new FormData()
          formData.append('file', file)

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          })

          const result = await response.json()

          if (!result.success) {
            throw new Error(result.error || 'Upload failed')
          }

          // Handle both old and new response formats
          const fileId = result.fileId || result.file?.id
          const fileUrl = result.url || result.file?.url

          if (!fileId) {
            throw new Error('No file ID returned from upload')
          }

          return {
            id: fileId,
            name: file.name,
            size: file.size,
            url: fileUrl || '',
          }
        })

        const newFiles = await Promise.all(uploadPromises)
        const updatedFiles = [...uploadedFiles, ...newFiles]
        setUploadedFiles(updatedFiles)

        // Debug: Log the file IDs being sent to parent
        const fileIds = updatedFiles.map((f) => f.id)
        console.log('FileUpload: Sending file IDs to parent:', fileIds)
        onFilesChange(fileIds)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Upload failed')
      } finally {
        setIsUploading(false)
      }
    },
    [uploadedFiles, maxFiles, onFilesChange],
  )

  const removeFile = (fileId: string) => {
    const updatedFiles = uploadedFiles.filter((f) => f.id !== fileId)
    setUploadedFiles(updatedFiles)

    // Debug: Log the updated file IDs
    const fileIds = updatedFiles.map((f) => f.id)
    console.log('FileUpload: File removed, sending updated file IDs:', fileIds)
    onFilesChange(fileIds)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const onDropRejected = useCallback(
    (fileRejections: any[]) => {
      if (!fileRejections || fileRejections.length === 0) return

      // If rejection is due to too many files, show the max-files message
      const tooMany = fileRejections.some((r) =>
        r?.errors?.some((err: any) => err?.code === 'too-many-files'),
      )

      if (tooMany) {
        const message = `Maximum ${maxFiles} files allowed. Please select fewer files.`
        try {
          window.alert(message)
        } catch (e) {
          setError(message)
        }
        setError(message)
        return
      }

      // Otherwise, aggregate other rejection reasons (size/type)
      const msgs: string[] = []
      fileRejections.forEach((r) => {
        ;(r.errors || []).forEach((err: any) => {
          if (err.code === 'file-too-large') msgs.push('One or more files exceed the maximum size')
          else if (err.code === 'file-invalid-type')
            msgs.push('One or more files have an invalid file type')
          else msgs.push(err.message || 'File rejected')
        })
      })

      const message = [...new Set(msgs)].join('; ')
      try {
        window.alert(message)
      } catch (e) {
        setError(message)
      }
      setError(message)
    },
    [maxFiles],
  )

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    onDropRejected,
    accept: acceptedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize,
    maxFiles: maxFiles - uploadedFiles.length,
    disabled: isUploading || uploadedFiles.length >= maxFiles,
    noClick: true, // we'll call open() manually to avoid duplicate file dialog on some platforms
  })

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isUploading || uploadedFiles.length >= maxFiles) return
    try {
      open()
    } catch (err) {
      // swallow - open may not be available in some environments
      console.warn('FileUpload: open() failed', err)
    }
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-[#9C6BFF] bg-[#9C6BFF]/10'
            : 'border-[#222] hover:border-[#9C6BFF]/50'
        } ${isUploading || uploadedFiles.length >= maxFiles ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} style={{ pointerEvents: 'none' }} tabIndex={-1} aria-hidden />
        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#9C6BFF] border-t-transparent"></div>
            <p className="text-sm text-[#B0B0B0]">Uploading files...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <svg
              className="w-8 h-8 text-[#B0B0B0]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <div className="text-sm text-[#B0B0B0]">
              {isDragActive ? (
                <p>Drop files here...</p>
              ) : (
                <div>
                  <p>
                    <span
                      className="text-[#9C6BFF] hover:text-[#8A5CE8] font-medium cursor-pointer"
                      onClick={handleOpen}
                    >
                      Click to upload
                    </span>{' '}
                    or drag and drop
                  </p>
                  <p className="text-xs text-[#666] mt-1">PDF, DOC, DOCX, PNG, JPG up to 10MB</p>
                  <p className="text-xs text-[#666]">
                    {uploadedFiles.length}/{maxFiles} files uploaded
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-[#B0B0B0] font-medium">Uploaded Files:</p>
          {uploadedFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-3 bg-[#0F0F0F] rounded-lg border border-[#222]"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{file.name}</p>
                </div>
              </div>
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
                onMouseUp={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(file.id)
                }}
                className="flex-shrink-0 p-1 hover:bg-red-500/20 rounded transition-colors"
              >
                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
