import * as Tabs from '@radix-ui/react-tabs'
import Editor from './editor'
import Preview from './preview'

interface Props {
  doc: string
  onChange: (doc: string) => void
}

export default function ViewTabs(props: Props) {
  const { doc, onChange } = props
  return (
    <Tabs.Root defaultValue="editor">
      <Tabs.List
        className="flex gap-4 mb-2"
        aria-label="Switch between editor and preview"
      >
        <Tabs.Trigger
          value="editor"
          className="px-5 py-1 bg-orange-200 rounded-3xl text-orange-900 text-sm"
        >
          Editor
        </Tabs.Trigger>
        <Tabs.Trigger
          value="preview"
          className="px-5 py-1 bg-purple-200 rounded-3xl text-purple-900 text-sm"
        >
          Preview
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="editor">
        <Editor initialDoc={doc} onChange={onChange} />
      </Tabs.Content>
      <Tabs.Content value="preview">
        <Preview doc={doc} />
      </Tabs.Content>
    </Tabs.Root>
  )
}
