import { HighlightStyle } from '@codemirror/language'
import { tags } from '@lezer/highlight'
import { EditorView } from '@codemirror/view'

export const editorTheme = EditorView.theme({
  '&.cm-editor': {
    borderTop: '1px solid hsl(360, 0%, 78%)',
    borderLeft: '1px solid hsl(360, 0%, 78%)',
    borderRight: '1px solid hsl(360, 0%, 78%)',
    borderRadius: '4px',
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0'
  },
  '.cm-content': {
    minHeight: '120px',
    padding: '8px 0'
  },
  '.cm-scroller': {
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;"
  },
  '&.cm-focused': {
    outline: 'none'
  },
  '.cm-line': {
    padding: '0 8px'
  }
})

export const languageHighlight = HighlightStyle.define([
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
