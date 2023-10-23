import React from "react";

function useFormValidation() {
  const [values, setValues ] = React.useState({});
  const [errors, setErrors ] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [isInputValid, setIsInputValid] = React.useState({});

  function handleChange(evt){
    const name = evt.target.name
    const value = evt.target.value
    const validationMessage = evt.target.validationMessage
    const valid = evt.target.validity.valid
    const form = evt.target.form

    setValues((oldValues) => {
      return {...oldValues, [name]: value, }
    })

    setErrors((oldErrors) => {
      return {...oldErrors, [name]: validationMessage, }
    })

    setIsInputValid((oldIsUnputValid) => {
      return {...oldIsUnputValid, [name]: valid, }
    })

    setIsValid(form.checkValidity())
  }

  function reset(data = {}) {
    setValues(data)
    setErrors({})
    setIsInputValid({})
    setIsValid(false)
  }

  const setValue = React.useCallback((name, value) => {
    setValues((oldValues) => {
      return {...oldValues, [name]: value,}
    })
  }, [])

  return {handleChange, values, errors, isValid, isInputValid, reset, setValue}
}

export default useFormValidation