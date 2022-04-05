import type { NextPage } from 'next';
import { useCallback, useEffect } from 'react';
import copy from 'copy-text-to-clipboard';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import TransformStep from '../components/TransformStep';
import About from '../components/About';
import { validateInputPath, validateInputTemplate } from '../lib/validators';
import { generateOutput } from '../lib/output-generator';
import { steps } from '../data/features';
import { event as value } from '../data/events';
import useEditorState from '../hooks/useEditorState';

import { useState } from 'react';
import { Switch } from '@headlessui/react';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const ERRORS = {
  EXAMPLE_OUTPUT: {
    INPUT_PATH_ERROR: 'Failed to render example output. Please fix the input path errors.',
    TEMPLATE_ERROR: 'Failed to render example output. Please fix the input template errors.',
  },
  INPUT_TEMPLATE: {
    INPUT_PATH_ERROR: 'Failed to render input templates. Please fix the input path errors.',
  },
};

const Home: NextPage = () => {
  const [event, setEvent, eventRef] = useEditorState(value);
  const [inputPath, setInputPath, inputPathRef, inputPathErrors, setInputPathErrors] = useEditorState();
  const [inputTemplate, setInputTemplate, inputTemplateRef, inputTemplateErrors, setInputTemplateErrors] = useEditorState();
  const [generatedOutput, setGenerateOut] = useEditorState();

  // editors
  const [inputPathEditor, setInputPathEditor, inputPathEditorRef] = useEditorState();
  const [_, setInputTemplateEditor, inputTemplateEditorRef] = useEditorState();

  const [isExamplePayloadVisible, setExamplePayloadVisibility] = useState(true);

  //@ts-ignore
  inputPathEditorRef.current = inputPathEditor;

  const copyToClipboard = (message: string, payload: any) => {
    copy(payload);

    toast.success(`${message} copied to clipboard`, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const validateInputPathEditor = useCallback(
    ({ event, inputPath }: { event?: any; inputPath?: any }) => {
      const { editor, monaco } = inputPathEditorRef.current;

      const errors = validateInputPath(event || eventRef.current, inputPath || inputPathRef.current, editor);
      const model = editor.getModel();
      monaco.editor.setModelMarkers(model, 'Example', errors);
      setInputPathErrors(errors);
    },
    [eventRef, inputPathEditorRef, inputPathRef, setInputPathErrors]
  );

  const validateInputTemplateEditor = useCallback(
    ({ inputTemplate, inputPath }: { inputPath?: any; inputTemplate?: any }) => {
      const { editor, monaco } = inputTemplateEditorRef.current;

      const errors = validateInputTemplate(inputPath || inputPathRef.current, inputTemplate || inputTemplateRef.current, editor);

      const model = editor.getModel();

      monaco.editor.setModelMarkers(model, 'Example', errors);
      setInputTemplateErrors(errors);
    },
    [inputPathRef, inputTemplateEditorRef, inputTemplateRef, setInputTemplateErrors]
  );

  const generateExampleOutput = useCallback(() => {
    const output = generateOutput(eventRef.current, inputPathRef.current, inputTemplateRef.current);
    setGenerateOut(output);
  }, [eventRef, inputPathRef, inputTemplateRef, setGenerateOut]);

  // Try to generate output if any values change in the flow
  useEffect(() => {
    try {
      if (inputTemplate) {
        generateExampleOutput();
      }
    } catch (error) {}
  }, [event, generateExampleOutput, inputPath, inputTemplate]);

  // If things are empty then clear editors
  useEffect(() => {
    if (!event) {
      setInputPath(null);
      setInputTemplate(null);
      setGenerateOut(null);
    }
  }, [event, inputPath, inputTemplate, setGenerateOut, setInputPath, setInputTemplate]);

  const exampleOutPutErrorMessage = inputPathErrors.length > 0 ? ERRORS.EXAMPLE_OUTPUT.INPUT_PATH_ERROR : inputTemplateErrors.length > 0 ? ERRORS.EXAMPLE_OUTPUT.TEMPLATE_ERROR : '';
  const inputTemplateErrorMessage = inputPathErrors.length > 0 ? ERRORS.INPUT_TEMPLATE.INPUT_PATH_ERROR : '';

  return (
    <div className="bg-gray-900">
      {/* Controls */}
      <div className="flex justify-end mx-10 mb-4">
        <Switch.Group as="div" className="flex items-center">
          <Switch
            checked={isExamplePayloadVisible}
            onChange={setExamplePayloadVisibility}
            className={classNames(
              isExamplePayloadVisible ? 'bg-pink-600' : 'bg-gray-200',
              'relative inline-flex flex-shrink-0 h-5 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            )}
          >
            <span
              aria-hidden="true"
              className={classNames(
                isExamplePayloadVisible ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-4 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
              )}
            />
          </Switch>
          <Switch.Label as="span" className="ml-3">
            <span className="text-xs font-medium text-gray-200">Show Example Output </span>
          </Switch.Label>
        </Switch.Group>
      </div>

      <div className="">
        {/* The Editor Grid */}
        <div className={`grid grid-cols-1 space-y-10 md:space-y-0 md:gap-3 justify-between mx-10  rounded-md ${isExamplePayloadVisible ? 'md:grid-cols-4': 'md:grid-cols-3'}`}>
          <TransformStep
            id="event-payload"
            color="indigo"
            title={<>Event Payload &rarr;</>}
            subtitle="Click on the properties you want to map."
            value={event}
            onCopy={(value) => copyToClipboard('Event Payload', JSON.stringify(value, null, 4))}
            onLineSelect={(key: string, value: string) => {
              const inputPathValue = inputPathRef.current ? inputPathRef.current : {};
              //@ts-ignore
              setInputPath({
                ...inputPathValue,
                [key]: value,
              });
            }}
            onChange={(value: any) => {
              try {
                const event = value ? JSON.parse(value) : null;
                setEvent(event);
                if (event) {
                  validateInputPathEditor({ event: event });
                }
              } catch (error) {
                console.log('ERR', error);
              }
            }}
            renderEditorWhenEmpty
          />
          <TransformStep
            id="input-path"
            color="green"
            emptyMessage="Click on fields in your event payload to get started"
            title={<>Input Path &rarr;</>}
            subtitle="Define variables as key value pairs."
            value={inputPath}
            onCopy={(value) => copyToClipboard('Input Path', JSON.stringify(value, null, 4))}
            errors={inputPathErrors}
            onInit={(editor, monaco) => {
              setInputPathEditor({ editor, monaco });
            }}
            onLineSelect={(key: string, value: string) => {
              setInputTemplate({
                ...inputTemplateRef.current,
                [key]: `<${key}>`,
              });
            }}
            onChange={(value: any) => {
              try {
                const newValue = value ? JSON.parse(value || {}) : null;
                setInputPath(newValue);
                if (value) {
                  validateInputPathEditor({ inputPath: newValue });
                  validateInputTemplateEditor({ inputPath: newValue });
                }
              } catch (error) {
                console.log('ERROR', error);
              }
            }}
          />

          <TransformStep
            id="input-template"
            color="blue"
            emptyMessage="Click on fields in your event payload to get started"
            title={<>Input Template &rarr;</>}
            subtitle="Define variables as key value pairs."
            value={inputTemplate}
            onCopy={(value) => copyToClipboard('Input Template', JSON.stringify(value, null, 4))}
            errors={inputTemplateErrors}
            onInit={(eee, mmm) => {
              setInputTemplateEditor({ editor: eee, monaco: mmm });
            }}
            errorOverLayMessage={inputTemplateErrorMessage}
            onChange={(value: any) => {
              try {
                const newValue = value ? JSON.parse(value || {}) : null;
                setInputTemplate(newValue);
                if (value) {
                  console.log('CHANGE!', value);
                  validateInputTemplateEditor({ inputTemplate: newValue });
                }
              } catch (error) {
                console.log('ERROR', error);
              }
            }}
          />

          {isExamplePayloadVisible && (
            <TransformStep
              id="example-output-template"
              color="pink"
              emptyMessage="Click on fields in your event payload to get started"
              title={<>Example Output</>}
              subtitle="Example output based on transform rules."
              value={generatedOutput}
              onCopy={(value) => copyToClipboard('Example Output', JSON.stringify(value, null, 4))}
              errors={[]}
              errorOverLayMessage={exampleOutPutErrorMessage}
              readOnly
            />
          )}
        </div>

        <div className="mx-10 mt-10 mb-20">
          <a className="text-yellow-600 text-sm mt-4 block text-right" href="https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-transform-target-input.html">
            Read more about transforming Amazon EventBridge target inputs on AWS &rarr;
          </a>
        </div>
      </div>

      <div className="bg-gray-100" id="how-it-works">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">How to use the Transformer?</h2>
              <p className="mt-4 text-base text-gray-500">Use the custom editors to quickly create input paths and templates from your Amazon EventBridge event.</p>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-2">
              <dl className="space-y-12">
                {steps.map((step) => (
                  <div key={step.title}>
                    <dt className="text-lg leading-6 font-medium text-gray-900">{step.title}</dt>
                    <dd className="mt-2 text-base text-gray-500">{step.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <About />
    </div>
  );
};

export default Home;
