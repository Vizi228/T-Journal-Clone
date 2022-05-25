import React, { useEffect } from 'react'
import EditorJS, { OutputData } from '@editorjs/editorjs';

interface EditorProps {
    setBlocks: (blocks: OutputData['blocks']) => void,
}

const Editor: React.FC<EditorProps> = ({ setBlocks }) => {
    useEffect(() => {
        const editor = new EditorJS({
            holder: 'editor',
            placeholder: 'Введите текст вашей статьи',
            onChange: async (api, event) => {
                const { blocks } = await editor.save()
                setBlocks(blocks)
            }
        })

        return () => {
            editor.isReady.then(() => {
                editor.destroy()
            }).catch(e => console.error('ERROR for editor cleanup', e))
        }
    }, [])
    return (
        <div onChange={(e) => console.log(e.target)} id='editor' />
    )
}


export default Editor
