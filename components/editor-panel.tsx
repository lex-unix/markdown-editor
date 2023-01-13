import {
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon
} from '@radix-ui/react-icons'
import EditorPanelButton from './editor-panel-button'
import { TooltipProvider } from '@radix-ui/react-tooltip'

interface Props {
  onBoldClick: () => void
  onItalicClick: () => void
  onStrikeClick: () => void
}

export default function EditorPanel(props: Props) {
  const { onBoldClick, onStrikeClick, onItalicClick } = props
  return (
    <div className="bg-gray-100 rounded-b-md border-[1px] border-slate-300">
      <TooltipProvider delayDuration={400}>
        <div className="flex gap-2 p-1">
          <EditorPanelButton
            icon={<FontBoldIcon width={22} height={22} />}
            onClick={onBoldClick}
            keys={['⌘', 'B']}
          />
          <EditorPanelButton
            icon={<FontItalicIcon width={22} height={22} />}
            onClick={onItalicClick}
            keys={['⇧', '⌘', 'I']}
          />
          <EditorPanelButton
            icon={<StrikethroughIcon width={22} height={22} />}
            onClick={onStrikeClick}
            keys={['⇧', '⌘', 'U']}
          />
        </div>
      </TooltipProvider>
    </div>
  )
}
