import { EditorState } from '@codemirror/state'
import { useCallback, useEffect } from 'react'
import useCodeMirror from '../hooks/use-codemirror'
import { insertBefore, insertAround } from '../lib/codemirror'
import EditorPanel from './editor-panel'

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

  const handleBoldClick = () => {
    if (!editorView || !selection) return
    const isSeletion = selection.ranges[0].from !== selection.ranges[0].to
    isSeletion
      ? insertAround('**', '**', editorView, selection)
      : insertBefore('****', editorView)
  }

  const handleItalicClick = () => {
    if (!editorView || !selection) return
    const isSeletion = selection.ranges[0].from !== selection.ranges[0].to
    isSeletion
      ? insertAround('*', '*', editorView, selection)
      : insertBefore('**', editorView)
  }

  const handleStrikeClick = () => {
    if (!editorView || !selection) return
    const isSeletion = selection.ranges[0].from !== selection.ranges[0].to
    isSeletion
      ? insertAround('~~', '~~', editorView, selection)
      : insertBefore('~~~~', editorView)
  }

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

      if (e.key === 'u' && e.metaKey && e.shiftKey) {
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

  return (
    <div className="editor max-w-md break-words">
      <div ref={refContainer}></div>
      <EditorPanel
        onBoldClick={handleBoldClick}
        onItalicClick={handleItalicClick}
        onStrikeClick={handleStrikeClick}
      />
    </div>
  )
}

export default Editor
