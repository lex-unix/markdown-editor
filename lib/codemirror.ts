import { EditorSelection } from '@codemirror/state'
import { EditorView } from '@codemirror/view'

export const insertAround = (
  start: string,
  end: string,
  view: EditorView,
  selection: EditorSelection
) => {
  for (const range of selection.ranges) {
    const text = view.state.sliceDoc(range.from, range.to)

    const startsWith = text.startsWith(start)
    const endsWith = text.endsWith(end)

    let output: string
    let anchor: number = range.from
    let head: number

    if (startsWith && endsWith) {
      output = text.slice(start.length, text.length - end.length)
      head = range.to - end.length - start.length
    } else if (startsWith && !endsWith) {
      output = text + end
      head = range.to + end.length
    } else if (!startsWith && endsWith) {
      output = text + end
      head = range.to + end.length
    } else {
      output = start + text + end
      head = range.to + end.length + start.length
    }

    view.dispatch({
      changes: {
        from: range.from,
        to: range.to,
        insert: output
      },
      selection: {
        anchor,
        head
      }
    })
  }
}

export const insertBefore = (marker: string, view: EditorView) => {
  const currentCursorPos = view.state.selection.ranges[0].from

  const output = marker
  const len = marker.length / 2

  view.dispatch({
    changes: {
      from: currentCursorPos,
      to: currentCursorPos,
      insert: output
    },
    selection: {
      anchor: currentCursorPos + len,
      head: currentCursorPos + len
    }
  })
}
