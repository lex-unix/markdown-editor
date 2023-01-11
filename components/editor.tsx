import { EditorState } from '@codemirror/state'
import { useCallback, useEffect } from 'react'
import useCodeMirror from '../hooks/use-codemirror'

interface Props {
  initialDoc: string
  onChange: (doc: string) => void
}

const Editor: React.FC<Props> = ({ initialDoc, onChange }) => {
  const handleChange = useCallback(
    (state: EditorState) => onChange(state.doc.toString()),
    [onChange]
  )

  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc,
    onChange: handleChange
  })

  useEffect(() => {
    if (editorView) {
    }
  }, [editorView])

  return <div ref={refContainer} className="editor"></div>
}

export default Editor
