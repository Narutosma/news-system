import React, { useState, useEffect } from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export default function SandDraft(props) {
    const [editorState, setEditorState] = useState(null);
    const onEditorStateChange = (value) => {
        setEditorState(value);
    }
    useEffect(() => {
        const html = props.content;
        if(html === undefined) return;
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState);
        }
    }, [props.content])
    // 富文本框失焦后设置
    const onBlurEditorHandle = () => {
        props.onHandle(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }
    return (
        <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
            onBlur={onBlurEditorHandle}
        />
    )
}
