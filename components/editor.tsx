import { EditorState } from '@codemirror/state'
import { useCallback, useEffect } from 'react'
import useCodeMirror from '../hooks/use-codemirror'
import { insertBefore, insertAround } from '../lib/codemirror'

interface Props {
  initialDoc: string
  onChange: (doc: string) => void
}

const Editor: React.FC<Props> = ({ initialDoc, onChange }) => {
  const handleChange = useCallback(
    (state: EditorState) => onChange(state.doc.toString()),
    [onChange]
  )

  const [refContainer, editorView, selection] = useCodeMirror<HTMLDivElement>({
    initialDoc,
    onChange: handleChange
  })

  useEffect(() => {
    if (!editorView || !selection) return

    const onKey = (e: KeyboardEvent) => {
      const isSeletion = selection.ranges[0].from !== selection.ranges[0].to

      if (e.key === 'b' && e.metaKey) {
        isSeletion
          ? insertAround('**', '**', editorView, selection)
          : insertBefore('****', editorView)
      }

      if (e.key === 'i' && e.metaKey && e.shiftKey) {
        isSeletion
          ? insertAround('*', '*', editorView, selection)
          : insertBefore('**', editorView)
      }

      if (e.key === 'u' && e.metaKey) {
        isSeletion
          ? insertAround('~~', '~~', editorView, selection)
          : insertBefore('~~~~', editorView)
      }
    }

    document.addEventListener('keydown', onKey)

    return () => document.removeEventListener('keydown', onKey)
  })

  useEffect(() => {
    if (editorView) {
    }
  }, [editorView])

  return <div ref={refContainer} className="editor"></div>
}

export default Editor
