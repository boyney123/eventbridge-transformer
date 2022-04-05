import React, { useState } from 'react';

import MonacoEditor, { EditorProps, Monaco, OnChange, OnMount, useMonaco } from '@monaco-editor/react';
import * as monacoType from 'monaco-editor/esm/vs/editor/editor.api';
import theme from 'monaco-themes/themes/Night Owl.json';
import { findPath } from '../lib/object-utils';

import { CheckCircleIcon, XCircleIcon, ExclamationCircleIcon } from '@heroicons/react/outline';

interface EditorCustomProps extends EditorProps {
  id: string;
  errors: monacoType.editor.IMarkerData[] | [];
  readOnly?: boolean;
  errorOverLayMessage?: string;
  onLineSelect?: (key: string, value: string) => void;
  validatior?: (value: any, editor: monacoType.editor.IStandaloneCodeEditor | undefined) => monacoType.editor.IMarkerData[];
  onInit?: (editor: monacoType.editor.IStandaloneCodeEditor, monaco: Monaco) => void;
  onCustomValidate?: (editorValue: string, monaco: any, editor: any) => void;
}

const Editor = (props: EditorCustomProps) => {
  const monaco = useMonaco();
  const [model, setModel] = useState<monacoType.editor.ITextModel | null>();
  const [editor, setEditor] = useState<monacoType.editor.IStandaloneCodeEditor>();
  const [showErrorPanel, setShowErrorPanel] = useState<boolean>(false);

  const { onChange = () => {}, validatior = () => {}, readOnly } = props;

  const onChangeHandler: OnChange = (value, event) => {
    try {
      onChange(value, event);
      if (model && value) {
        const errors = validatior(JSON.parse(value), editor);
        if (errors) monaco?.editor.setModelMarkers(model, 'Example', errors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onMount: OnMount = (editor: monacoType.editor.IStandaloneCodeEditor, monaco: any) => {
    monaco.editor.defineTheme('monokai', theme);
    monaco.editor.setTheme('monokai');

    props.onInit && props.onInit(editor, monaco);

    const model = editor.getModel();

    setModel(model);
    setEditor(editor);

    editor.onDidChangeCursorSelection((event) => {
      // only process if editor has focus
      if (!editor.hasTextFocus()) return;

      const model = editor.getModel();

      const currentPosition = editor.getPosition();
      if (!currentPosition) return;

      const lineNumberValue = model ? model.getLineContent(currentPosition.lineNumber) : '';

      try {
        const selectedValue = lineNumberValue.trim();
        const parts = selectedValue.replace(/"|,/g, '').split(/:(.*)/s);

        const key = parts[0].trim();
        const value = parts[1].trim();

        const editorValue = editor.getValue();

        if (editorValue) {
          const objectPath = findPath(JSON.parse(editorValue), key, value);
          props.onLineSelect && props.onLineSelect(key, `$${objectPath}`);
        }
      } catch (error) {
        // console.log(props.id, error);
      }
    });
  };

  const { options, errorOverLayMessage, errors = [], ...otherProps } = props;
  const hasErrors = errors.length > 0;

  const heights = showErrorPanel ? { editor: '350px', errors: '150px' } : { editor: '500px', errors: '0px' };

  if (errorOverLayMessage) {
    return (
      <div className="text-gray-400 text-xs h-full flex items-center text-center">
        <div className="text-center mx-auto space-y-2 text-red-400 px-20">
          <ExclamationCircleIcon className="w-14 h-14 text-center mx-auto" />
          <p>{errorOverLayMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <MonacoEditor
        theme="vs-dark"
        options={{ minimap: { enabled: false }, fontSize: 14, ...options, lineNumbers: 'off', readOnly: readOnly }}
        defaultLanguage="json"
        {...otherProps}
        height={heights.editor}
        onMount={onMount}
        onChange={onChangeHandler}
      ></MonacoEditor>
      <div className={` cursor-pointer py-2 text-xs flex px-4 justify-between text-gray-200 uppercase border-t border-gray-800`} onClick={() => setShowErrorPanel(!showErrorPanel)}>
        <div className="font-bold">
          Problems <span className={`${hasErrors ? 'bg-red-500' : 'bg-gray-400'} rounded-full px-1`}>{errors.length}</span>
        </div>

        <div className="font-bold flex items-center">
          {hasErrors && (
            <>
              <XCircleIcon className="inline-block h-4 w-4 mr-2 text-red-500" />
              Invalid
            </>
          )}
          {!hasErrors && (
            <>
              <CheckCircleIcon className="inline-block h-4 w-4 mr-2 text-green-500" />
              Valid
            </>
          )}
        </div>
      </div>
      {showErrorPanel && errors.length > 0 && (
        <div className="px-4 overflow-auto" style={{ height: heights.errors }}>
          <table className="border-collapse w-full text-xs text-red-400">
            <thead>
              <tr>
                <th className="p-2 w-8">Line</th>
                <th className="p-2 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              {errors.map((error) => {
                return (
                  <tr key={error.message} className="border-t border-gray-700">
                    <td className="p-2 cursor-pointer">
                      {error.startLineNumber}:{error.endColumn}
                    </td>
                    <td className="p-2 text-left">{error.message}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Editor;
