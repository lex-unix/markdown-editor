import React, { createElement, Fragment, useEffect, useState } from 'react'
import { unified } from 'unified'
import rehypeReact from 'rehype-react'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'

interface Props {
  doc: string
}

const Preview: React.FC<Props> = ({ doc }) => {
  const [md, setMd] = useState<any>(Fragment)

  useEffect(() => {
    unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(remarkGfm)
      .use(rehypeReact, { createElement, Fragment })
      .process(doc)
      .then(file => {
        setMd(file.result)
      })
  }, [doc])

  return <div className="preview">{md}</div>
}

export default Preview
