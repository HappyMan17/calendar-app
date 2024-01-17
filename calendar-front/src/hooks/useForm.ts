import { useEffect, useMemo, useState } from 'react';

type InitForm = Record<string, string>;
type FormValidation = Record<string, [((value: string) => string), string]>;
// interface UseFormReturn {
//   formState: InitForm;
//   onInputChange: (event: Event) => void;
//   onResetForm: () => void;
//   isFormValid: boolean;
// }

export const useForm = (
  initialForm: InitForm = {},
  formValidations: FormValidation = {}
) => {
  const [ formState, setFormState ] = useState( initialForm );
  const [ formValidation, setFormValidation ]
    = useState<Record<string, string | null>>({});

  useEffect(() => {
    createValidators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ formState ]);

  useEffect(() => {
      setFormState( initialForm );
  }, [ initialForm ]);


  const isFormValid = useMemo( () => {

      for (const formValue of Object.keys( formValidation )) {
          if ( formValidation[formValue] !== null ) return false;
      }

      return true;
  }, [ formValidation ]);


  type Event = {
    target: {
      name: string;
      value: string;
    }
  }
  const onInputChange = ({ target }: Event) => {
      const { name, value } = target;
      setFormState({
          ...formState,
          [ name ]: value
      });
  };

  const onResetForm = () => {
      setFormState( initialForm );
  };

  type FormChecked = Record<string, string | null>
  const createValidators = () => {
    const formCheckedValues: FormChecked | null = {};

    for (const formField of Object.keys( formValidations )) {
      const [ fn, errorMessage ] = formValidations[formField];

      formCheckedValues[`${ formField }Valid`] =
        fn( formState[formField] ) ? null : errorMessage;
    }

    setFormValidation( formCheckedValues );
  };

  return {
      ...formState,
      formState,
      onInputChange,
      onResetForm,

      ...formValidation,
      isFormValid
  };
};
