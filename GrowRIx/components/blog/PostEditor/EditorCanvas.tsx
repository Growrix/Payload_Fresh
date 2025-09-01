"use client";

import React, { useState } from 'react';
import TiptapEditor from './TiptapEditor';

type EditorCanvasProps = {
  content?: string;
  onChange?: (value: string) => void;
};

export default function EditorCanvas({ content: propContent, onChange: propOnChange }: EditorCanvasProps) {
  const [internalContent, setInternalContent] = useState('');
  const content = propContent !== undefined ? propContent : internalContent;

  const callOnChange = (v: string) => {
    if (propOnChange) propOnChange(v);
    else setInternalContent(v);
  };

  const handleChange = (v: string) => {
    callOnChange(v);
  };

  return (
    <div>
      <TiptapEditor
        content={content}
        onChange={handleChange}
        placeholder="Start writing your post here..."
      />
    </div>
  );
}
