import { useRef, useState } from 'react';

const useEditorState = (defaultValue?: any) => {
  const [value, setValue] = useState<any>(defaultValue);
  const [errors, setErrors] = useState<any>([]);
  const ref = useRef();
  ref.current = value;
  return [value, setValue, ref, errors, setErrors];
};

export default useEditorState;