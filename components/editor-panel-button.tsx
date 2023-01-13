import * as Tooltip from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'

interface Props {
  icon: ReactNode
  onClick: () => void
  keys: Array<string>
}

export default function EditorPanelButton(props: Props) {
  const { icon, onClick, keys } = props

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button onClick={onClick} className="p-1 hover:bg-gray-200 rounded-md">
          {icon}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="bottom"
          sideOffset={8}
          className="bg-white py-2 px-4 rounded-md border border-gray-200"
        >
          <div className="inline-flex gap-2 items-stretch">
            {keys.map((key, i) => (
              <kbd
                key={i}
                className="p-1 text-[12px] uppercase bg-gray-100 text-lg font-sans min-w-[20px] h-[20px] inline-flex justify-center items-center rounded-sm font-light"
              >
                {key}
              </kbd>
            ))}
          </div>
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
}
