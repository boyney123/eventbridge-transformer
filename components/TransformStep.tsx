import { ClipboardCopyIcon } from '@heroicons/react/outline';
import React from 'react';
import Editor from './Editor';

import { Monaco } from '@monaco-editor/react';
import * as monacoType from 'monaco-editor/esm/vs/editor/editor.api';

interface TransformStepProps {
  id: string;
  title: string | any;
  subtitle: string;
  errors?: any[];
  color: string;
  value: string;
  emptyMessage?: string;
  renderEditorWhenEmpty?: boolean;
  errorOverLayMessage?: string;
  readOnly?: boolean;
  onInit?: (editor: monacoType.editor.IStandaloneCodeEditor, monaco: Monaco) => void;
  onLineSelect?: (key: string, value: string) => void;
  onChange?: (value: string) => void;
  onCopy: (value: string) => void;
}

const TransformStep = (props: TransformStepProps) => {
  const { title, subtitle, id, errors = [], value, onLineSelect, onChange = () => {}, onCopy, color, onInit, errorOverLayMessage, renderEditorWhenEmpty, emptyMessage, readOnly } = props;
  const renderEditor = value || renderEditorWhenEmpty;

  return (
    <div className={`border-2 border-${color}-500 border-opacity-50 shadow-xl shadow-${color}-800/60 rounded-md`}>
      <div className={`text-sm text-gray-200  px-6 py-1 bg-${color}-500 bg-opacity-50 flex justify-between items-center rounded-sm`}>
        <div className="font-bold">
          {title}
          <span className="block text-xs font-light">{subtitle}</span>
        </div>
        <button type="button" onClick={() => onCopy(value)}>
          <ClipboardCopyIcon className="w-4 h-4" />
        </button>
      </div>
      {!value && emptyMessage && (
        <div className="text-gray-400 text-xs h-full flex items-center text-center" style={{ height: '500px' }}>
          <p className="w-full">{emptyMessage}</p>
        </div>
      )}
      {renderEditor && (
        <Editor
          id={id}
          height={'500px'}
          className="mt-4"
          errors={errors}
          errorOverLayMessage={errorOverLayMessage}
          value={value ? JSON.stringify(value, null, 4) : ''}
          onInit={onInit}
          onLineSelect={(key: string, value: string) => {
            if (key && value && onLineSelect) {
              onLineSelect(key, value);
            }
          }}
          onChange={(value: any) => onChange(value)}
          readOnly={readOnly}
        />
      )}
    </div>
  );
};

export default TransformStep;
