import './index.css'
import ReactDOM from 'react-dom'
import React, { useState } from 'react'
import {
  createPlateComponents,
  createPlateOptions,
  Plate,
  createHistoryPlugin,
  createReactPlugin,
  createBasicElementPlugins,
  createBasicMarkPlugins,
  createLinkPlugin,
  serializeHTMLFromNodes,
  createEditorPlugins,
  deserializeHTMLToDocumentFragment,
} from '@udecode/plate'
import { initialValueLinks } from './config/initialValues'
import { editableProps } from './config/pluginOptions'

const id = 'Reproduction'

let components = createPlateComponents({
  // customize your components by plugin key
})

const options = createPlateOptions({
  // customize your options by plugin key
})

const initialValue = [...initialValueLinks]

const plugins = [
  createReactPlugin(),
  createHistoryPlugin(),
  createLinkPlugin(),
  ...createBasicElementPlugins(),
  ...createBasicMarkPlugins(),
]

const Editor = () => {
  const [editorValue, setEditorValue] = useState(initialValue)
  const editor = createEditorPlugins()
  const [htmlValue, setHtmlValue] = useState(
    serializeHTMLFromNodes(editor, { plugins: plugins, nodes: editorValue })
  )
  console.log({ htmlValue })
  const handleChange = (newValue) => {
    setEditorValue(newValue)
    const htmlState =
      newValue &&
      serializeHTMLFromNodes(editor, { plugins: plugins, nodes: newValue })
    setHtmlValue(htmlState)
  }
  const valueFromHtml = deserializeHTMLToDocumentFragment(editor, {
    plugins: plugins,
    element: htmlValue,
  })
  console.log({ valueFromHtml })
  return (
    <>
      <Plate
        id={id}
        plugins={plugins}
        components={components}
        options={options}
        editableProps={editableProps}
        onChange={handleChange}
        initialValue={editorValue}
      />
      <Plate
        id={'html'}
        plugins={plugins}
        components={components}
        options={options}
        editableProps={{ readOnly: true }}
        value={valueFromHtml}
      />
    </>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<Editor />, rootElement)
