import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { socket } from './ChatPage';
interface FileUploadModalProps {
  ticketNumber: string | undefined,
  ticketId: string | undefined,
  isOpen: boolean
  onClose: () => void
}

const fileTypeMap = {
  doc: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  video: ['video/*'],
  audio: ['audio/*'],
  photo: ['image/*']
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({ isOpen, onClose, ticketId, ticketNumber }) => {
  const [files, setFiles] = useState<File[]>([])
  const [fileType, setFileType] = useState<string>('')
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file && fileTypeMap[fileType as keyof typeof fileTypeMap].some(type => 
      type.includes('/*') ? file.type.startsWith(type.replace('/*', '/')) : file.type === type
    )) {
      setFiles([file])
    } else {
      alert(`Please select a valid ${fileType} file`)
    }
  }, [fileType])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: fileType ? Object.fromEntries(
      fileTypeMap[fileType as keyof typeof fileTypeMap].map(type => [type, []])
    ) : undefined,
    maxFiles: 1
  })

  const handleSend = async () => {
    if (files.length === 0) {
      alert('Please select a file first')
      return
    }
    const username = localStorage.getItem('username')
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('fileType', fileType)
    formData.append('ticketNumber', String(ticketNumber))
    formData.append('username', String(username));

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const xhr = new XMLHttpRequest()
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded * 100) / event.total)
          setUploadProgress(progress)
        }
      })

      xhr.onload = () => {
        if (xhr.status === 200) {
          const fileSize = (files[0].size / 1024).toFixed(2); // Convert to KB
          const messageData = {
            ticketId: ticketId,
            content: `You sent the file: ${files[0].name}, 
            Size: ${(Number(fileSize)/1024).toFixed(2)} KB`,
            sender: "user",
            ticketNumber: ticketNumber,
            type:'upload',
          };
          socket.emit('sendMessage', messageData);
          setFiles([])
          setUploadProgress(0)
          setIsUploading(false)
          onClose()
        } else {
          alert('Upload failed')
          setIsUploading(false)
        }
      }

      xhr.onerror = () => {
        alert('Upload failed')
        setIsUploading(false)
      }

      xhr.open('POST', 'http://localhost:3000/api/tickets/sendFile')
      xhr.send(formData)

    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while sending files')
      setIsUploading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload and Send File</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select onValueChange={(value) => {
            setFileType(value)
            setFiles([])
          }}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select file type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="doc">Document</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="photo">Photo</SelectItem>
            </SelectContent>
          </Select>

          {fileType && (
            <div
              {...getRootProps()}
              className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer ${
                isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
          )}

          {files.length > 0 && (
            <div>
              <h4 className="font-semibold">Selected Files:</h4>
              <ul className="list-disc pl-5">
                {files.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}

          {isUploading && (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-sm text-center">{uploadProgress}% uploaded</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleSend} disabled={isUploading || files.length === 0}>
            {isUploading ? 'Uploading...' : 'Send'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FileUploadModal