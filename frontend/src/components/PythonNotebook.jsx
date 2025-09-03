import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'

function PythonNotebook() {
  const [code, setCode] = useState('print("Hello, world!")')
  const [output, setOutput] = useState('')

  const runCode = async () => {
    const response = await fetch('/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    })
    const data = await response.json()
    setOutput(data.output)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Python Notebook</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Python Notebook</DialogTitle>
        </DialogHeader>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-40 p-2 font-mono border rounded"
        />
        <Button className="mt-2" onClick={runCode}>Run</Button>
        <pre className="mt-4 p-2 bg-gray-100 rounded h-40 overflow-auto">{output}</pre>
      </DialogContent>
    </Dialog>
  )
}

export default PythonNotebook
