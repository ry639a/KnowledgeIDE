// src/Tiptap.tsx
'use client'
import React, { createContext, useMemo } from "react";
import { Editor } from '@tiptap/core'
import { useEditor, EditorContent , EditorContext} from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import { Mathematics } from '@tiptap/extension-mathematics'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, Highlight.configure({ multicolor: true }), Mathematics.configure({
      inlineOptions: {
        // optional options for the inline math node
      },
      blockOptions: {
        // optional options for the block math node
      },
      katexOptions: {
        // optional options for the KaTeX renderer
      },
    }),],
    content: '<h2>Workspace</h2>', // initial content
    autofocus: true,
    editable: true,
    injectCSS: false,
    editorProps: {
        attributes: {
            class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3", }
        }
  })

  // Memoize the provider value to avoid unnecessary re-renders
  const providerValue = useMemo(() => ({ editor }), [editor])

  return (
    <>
      <EditorContext.Provider value={providerValue}>
      <EditorContent editor={editor} />
       </EditorContext.Provider>
    </>
  )
}

export default Tiptap