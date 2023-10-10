import './App.css'
import { Navbar } from './components/navbar';
import { H1 } from './components/header';
import { useState, useRef, useEffect } from 'react';
import { Card } from './components/card';
import {useElementSize} from "usehooks-ts"

import Editor,{Monaco} from '@monaco-editor/react';
import {editor} from "monaco-editor"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from './components/button';

function App() {
  const [show, setShow] = useState(false)
  const [markdown,setMarkdown] = useState("# Hi, this is a markdown editor")
  const monacoRef = useRef<Monaco|null>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor|null>(null);
  const [squareRef, { width, height }] = useElementSize()


  function handleEditorDidMount(editor:editor.IStandaloneCodeEditor, monaco: Monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = editor;
    monacoRef.current=monaco
  }
  const resizeHandler =() => {
    // make editor as small as possible
    editorRef?.current?.layout({ width: 0, height: 0 })
  
    // wait for next frame to ensure last layout finished
    window.requestAnimationFrame(() => {
      // get the parent dimensions and re-layout the editor
      editorRef?.current?.layout({ width: width, height:height })
    })
  }
  useEffect(()=>{
    window.addEventListener('resize', resizeHandler)
    return()=>{
      window.removeEventListener('resize',resizeHandler)
    }
  },[])

  return (
    <div style={{display:'flex', flexDirection:"column", height:"100%"}}>
      <Navbar>
        <H1>Markdown Previewer</H1>
        <Button onClick={()=>setShow(!show)}>
          Markdown Cheat Sheet
        </Button>
      </Navbar>
      <div style={{
        display:"flex",
        flex: 1,
        flexDirection:"column",
        padding:"5px",
        gap:"5px",
      }}>
        {show?
        <Card $show={show} $height="fit-content">
          <Markdown remarkPlugins={[remarkGfm]}>
            {`# Markdown cheatsheet
            - # H1
            - ## H2
            - ### H3
            - **bold**
            - *italic*
            - [link](http://a.com)
            - ![Image](http://url/a.png)
            - \`inline code\`
            - \`\`\`blcok code\`\`\`
            - -list item 
            `
          }</Markdown>
        </Card>:
          <></>
        }
        <div style={{
        flex: 1,
        display: "flex",
        gap:"5px",
        flexWrap:"wrap"
      }}>
        <Card ref={squareRef} $show $height={""}>
        <Editor
          
          defaultLanguage="markdown"
          defaultValue="# Hi, this is a markdown editor"
          onChange={(value)=>{
            setMarkdown(value??"")
          }}
          onMount={handleEditorDidMount}
        />
        </Card>
        <Card $show $height={""}>
          <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
        </Card>
      </div>
      </div>
    </div>
  )
}

export default App
