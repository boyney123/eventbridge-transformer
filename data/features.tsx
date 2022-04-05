import { GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline';

export const features = [
  {
    name: '1. Start with your Event',
    description: 'Write or paste your EventBridge event into the first code block (Event Payload).',
    icon: GlobeAltIcon,
  },
  {
    name: '2. Select fields you wish to transform',
    description: (
      <>
        Click on the properties within your event editor to generate your EventBridge{' '}
        <a className="text-yellow-600 underline" href="https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-transform-target-input.html" target="_blank" rel="noreferrer">
          input path.
        </a>{' '}
        Then click on fields in the input path to generate your input template.
      </>
    ),
    icon: ScaleIcon,
  },
  {
    name: '3. Copy to clipboard',
    description: 'Once done you can copy the input path and template to your clipboard ready for AWS.',
    icon: LightningBoltIcon,
  },
];


export const steps = [
  {
    title: '1. Start with your Event',
    description: 'Paste your EventBridge event into the "Event Payload" editor.',
  },
  {
    title: '2. Select fields you wish to transform',
    description: (
      <>
        Click on the properties within your event to generate your EventBridge{' '}
        <a className="text-yellow-600 underline" href="https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-transform-target-input.html" target="_blank" rel="noreferrer">
          input path.
        </a>{' '}
        Then click on fields in the input path to generate your input template.
      </>
    ),
  },
  {
    title: '3. Copy to clipboard',
    description: 'Once you are happy with your input paths and templates you can quickly copy the format to clipboard using the editor icons.',
  },
  // More titles...
];