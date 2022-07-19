import React, { useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

export default function SandDraft(props) {
    const [editorState, setEditorState] = useState(null);
    const onEditorStateChange = (value) => {
        setEditorState(value);
    }
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
