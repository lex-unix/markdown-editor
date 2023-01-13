import React, { useState, useEffect, useRef } from 'react'
import { EditorSelection, EditorState } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { defaultKeymap, historyKeymap, history } from '@codemirror/commands'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags } from '@lezer/highlight'

const languageHighlight = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: '1.6em',
    fontWeight: 'bold'
  },
  {
    tag: tags.heading2,
    fontSize: '1.4em',
    fontWeight: 'bold'
  },
  {
    tag: tags.heading3,
    fontSize: '1.2em',
    fontWeight: 'bold'
  },
  {
    tag: tags.emphasis,
    fontStyle: 'italic'
  },
  {
    tag: tags.strong,
    fontWeight: 'bold'
  },
  {
    tag: tags.strikethrough,
    textDecoration: 'line-through'
  }
])

const editorTheme = EditorView.theme({
  '&.cm-editor': {
    border: '1px solid hsl(360, 0%, 78%)',
    borderRadius: '4px'
  },
  '.cm-scroller': {
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;"
  },
  '&.cm-focused': {
    outline: 'none'
  }
})

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
        keymap.of([...defaultKeymap, ...historyKeymap]),
        history(),
        markdown({
          base: markdownLanguage,
          addKeymap: true
        }),
        editorTheme,
        syntaxHighlighting(languageHighlight),
        EditorView.updateListener.of(update => {
          if (update.selectionSet) {
            setSelection(update.state.selection)
          }
          if (update.changes) {
            onChange && onChange(update.state)
          }
        })
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
