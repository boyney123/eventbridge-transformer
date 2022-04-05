import { getDeepKeys } from './object-utils';
import get from 'lodash.get'

export const generateOutput = (event: any, inputPath: any, inputTemplate: any) => {
  const regex = /<.*>/g;

  const inputTemplateKeys = getDeepKeys(inputTemplate);
  return inputTemplateKeys.reduce((output: any, key: string) => {
    const valueFromProperty = get(inputTemplate, key);

    // if value is not string then continue
    if (typeof valueFromProperty !== 'string') {
      return {
        ...output,
        [key]: valueFromProperty,
      };
    }

    // if value is not <value> then continue...
    const isAWSMappedValue = valueFromProperty.match(regex);
    if (!isAWSMappedValue) {
      return {
        ...output,
        [key]: valueFromProperty,
      };
    }

    const value = valueFromProperty.replace('<', '').replace('>', '');

    const inputPathValue = get(inputPath, value);
    const cleanInputValue = inputPathValue.replace('$.', '');
    const valueFromPayload = get(event, cleanInputValue);

    return {
      ...output,
      [key]: valueFromPayload,
    };
  }, {});
};
