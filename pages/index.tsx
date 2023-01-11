import Editor from '../components/editor'
import { useCallback, useState } from 'react'
import Preview from '../components/preview'

export default function Home() {
  const [doc, setDoc] = useState('# Hello, World \n')

  const handleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc)
  }, [])

  return (
    <>
      <main>
        <Editor initialDoc={doc} onChange={handleDocChange} />
        <Preview doc={doc} />
      </main>
    </>
  )
}
