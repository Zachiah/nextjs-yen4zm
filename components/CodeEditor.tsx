import { useEffect, useRef, useState } from 'react';

const CodeEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  const el = useRef(null);
  const [monaco, setMonaco] =
    useState<typeof import('monaco-editor/esm/vs/editor/editor.api')>();

  useEffect(() => {
    const w = window as typeof window & { THE_MONACO_MODULE: any };

    if (w.THE_MONACO_MODULE) {
      setMonaco(w.THE_MONACO_MODULE);
      return;
    }

    import('monaco-editor/esm/vs/editor/editor.api').then((newMonaco) => {
      setMonaco(newMonaco);

      (window.MonacoEnvironment ?? {}).getWorkerUrl = (_moduleId, label) => {
        if (label === 'json') return '_next/static/json.worker.js';
        if (label === 'css') return '_next/static/css.worker.js';
        if (label === 'html') return '_next/static/html.worker.js';
        if (label === 'typescript' || label === 'javascript')
          return '_next/static/ts.worker.js';
        return '_next/static/editor.worker.js';
      };
    });
  }, []);

  useEffect(() => {
    if (!monaco) {
      return;
    }
    const editor = monaco.editor.create(el.current, {
      value: value,
      language: 'javascript',
      theme: 'vs-dark',
    });

    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });

    return () => {
      editor.dispose();
    };
  }, [monaco]);

  return <div ref={el} style={{ height: '400px' }} />;
};

export default CodeEditor;
