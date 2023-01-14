import { useCallback, useState } from 'react'
import ViewTabs from '../components/view-tabs'

export default function Home() {
  const [doc, setDoc] = useState('')

  const handleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc)
  }, [])

  return (
    <>
      <main className="my-4 mx-20">
        <ViewTabs doc={doc} onChange={handleDocChange} />
      </main>
    </>
  )
}
