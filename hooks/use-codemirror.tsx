import React, { useState, useEffect, useRef } from 'react'
import { EditorSelection, EditorState } from '@codemirror/state'
import { EditorView, keymap, placeholder } from '@codemirror/view'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { historyKeymap, history } from '@codemirror/commands'
import { syntaxHighlighting } from '@codemirror/language'
import { editorTheme, languageHighlight } from '../lib/editor-theme'

interface Props {
  initialDoc: string
  onChange?: (state: EditorState) => void
}

const useCodeMirror = <T extends Element>(
  props: Props
): [React.MutableRefObject<T | null>, EditorView?, EditorSelection?] => {
  const refContainer = useRef<T>(null)
  const [editorView, setEditorView] = useState<EditorView>()
  const [selection, setSelection] = useState<EditorSelection>()
  const { initialDoc, onChange } = props

  useEffect(() => {
    if (!refContainer.current) return

    const startState = EditorState.create({
      doc: initialDoc,
      extensions: [
        keymap.of([...historyKeymap]),
        history(),
        markdown({
          base: markdownLanguage,
          addKeymap: true
        }),
        placeholder("What's on your mind?"),
        editorTheme,
        syntaxHighlighting(languageHighlight),
        EditorView.updateListener.of(update => {
          if (update.selectionSet) {
            setSelection(update.state.selection)
          }
          if (update.changes) {
            onChange && onChange(update.state)
          }
        }),
        EditorView.lineWrapping
      ]
    })

    const view = new EditorView({
      state: startState,
      parent: refContainer.current
    })
    setEditorView(view)

    return () => view.destroy()
    // eslint-disable-next-line
  }, [refContainer])

  return [refContainer, editorView, selection]
}

export default useCodeMirror
