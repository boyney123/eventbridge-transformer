import get from 'lodash.get';
import { getDeepKeys } from './object-utils';
import {  } from '@monaco-editor/react'

import { editor } from 'monaco-editor/esm/vs/editor/editor.api';

const validateProperty = (data: any, value: any) => {
  return !!get(data, value);
};

export const validateInputPath = (event: any, inputPath: any, editor: any): editor.IMarkerData[] => {
  const allKeysInObjectAsPaths = getDeepKeys(inputPath);

  const inputPathAsString = JSON.stringify(inputPath, null, 4);

  return allKeysInObjectAsPaths.reduce((editorErrors: any, path: string) => {
    const valueFromProperty = get(inputPath, path);
    const value = valueFromProperty.replace('$.', '');
    const isValidProperty = validateProperty(event, value);

    if (!isValidProperty) {
      const indexOfProperty = inputPathAsString.indexOf(valueFromProperty);
      const position = editor.getModel().getPositionAt(indexOfProperty);
      editorErrors.push({
        startLineNumber: position.lineNumber,
        startColumn: position.column,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
        message: `"${valueFromProperty}" is not a valid input path. Missing object path "${value}" from event payload.`,
        severity: 3,
      });
    }

    return editorErrors;
  }, []);
};


export const validateInputTemplate = (inputPath: any, inputTemplate: any, editor: any) => {

  const allKeysInObjectAsPaths = getDeepKeys(inputTemplate);
  const inputTemplateAsString = JSON.stringify(inputTemplate, null, 4);

  // match for <> e.g <word>
  const regex = /<.*>/g;

  return allKeysInObjectAsPaths.reduce((editorErrors: any, path: string) => {
    const valueFromProperty = get(inputTemplate, path);

    if(typeof valueFromProperty !== 'string') return editorErrors;

    const isAWSMappedValue = valueFromProperty.match(regex);

    // No AWS mapping, input templates allow custom values, ignore.
    if(!isAWSMappedValue) return editorErrors;

    const value = valueFromProperty.replace('<', '').replace('>', '');
    const isValidProperty = validateProperty(inputPath, value);

    if (!isValidProperty) {
      const indexOfProperty = inputTemplateAsString.indexOf(valueFromProperty);
      const position = editor.getModel().getPositionAt(indexOfProperty);

      editorErrors.push({
        startLineNumber: position.lineNumber,
        startColumn: position.column,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
        message: `"${valueFromProperty}" is not a valid input template. Missing property "${value}" from input path.`,
        severity: 3,
      });
    }

    return editorErrors;
  }, []);
};
