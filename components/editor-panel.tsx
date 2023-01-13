import {
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon
} from '@radix-ui/react-icons'

interface Props {
  onBoldClick: () => void
  onItalicClick: () => void
  onStrikeClick: () => void
}

export default function EditorPanel(props: Props) {
  const { onBoldClick, onStrikeClick, onItalicClick } = props
  return (
    <div className="bg-gray-100 rounded-b-md border-[1px] border-slate-300">
      <div className="flex gap-2 p-1">
        <button
          onClick={onBoldClick}
          className="p-1 hover:bg-gray-200 rounded-md"
        >
          <FontBoldIcon width={22} height={22} />
        </button>
        <button
          onClick={onItalicClick}
          className="p-1 hover:bg-gray-200 rounded-md"
        >
          <FontItalicIcon width={22} height={22} />
        </button>
        <button
          onClick={onStrikeClick}
          className="p-1 hover:bg-gray-200 rounded-md"
        >
          <StrikethroughIcon width={22} height={22} />
        </button>
      </div>
    </div>
  )
}
