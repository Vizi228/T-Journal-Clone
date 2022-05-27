import React, { useEffect } from 'react'
import EditorJS, { OutputData } from '@editorjs/editorjs';

interface EditorProps {
    setBlocks: (blocks: OutputData['blocks']) => void,
    initialValue?: OutputData['blocks']
}

const Editor: React.FC<EditorProps> = ({ setBlocks, initialValue }) => {
    useEffect(() => {
        const editor = new EditorJS({
            holder: 'editor',
            placeholder: 'Введите текст вашей статьи',
            onChange: async (api, event) => {
                const { blocks } = await editor.save()
                setBlocks(blocks)
            },
            data: {
                blocks: initialValue
            }
        })

        return () => {
            editor.isReady.then(() => {
                editor.destroy()
            }).catch(e => console.error('ERROR for editor cleanup', e))
        }
    }, [])
    return (
        <div id='editor' />
    )
}


export default Editor
