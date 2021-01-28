import React, { useState, useEffect } from 'react'


function RegForm({
  initialValues,
  validate
}) {
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState(initialValues)

  useEffect(() => {
    validateValues(values)
  }, [values])

  function handleChange(e) {
    const fieldName = e.target.getAttribute('name')
    const value = e.target.value
    setValues({
      ...values,
      [fieldName]: value,
    })
  }

  function validateValues(values) {
    setErrors(validate(values))
  }

  return {
    values,
    errors,
    setErrors,
    handleChange
  }
}



function App() {
  const forma = RegForm({
    initialValues: {
     req: ''
    },

    validate: function (values) {
      const errors = {};

      if(values.req.length < 1) {
        errors.req = 'Por favor, escrever um Id'
      }
    
      return errors
    
    }

  })
  
  return (
   <form onSubmit={(e) => {
     e.preventDefault()
    
   }}>
     <div>
       <input
        type="text"
        placeholder="Id"
        name="req"
        id="req"
        onChange={forma.handleChange}
        value={forma.values.req}
        />
        <br/>	
        {forma.errors.req && <span className="formaField_error">{forma.errors.req}</span>}
      </div>
      <button type="submit">
        Cadastrar
      </button>
              <div onChange={forma.handleChange}>
                <p>
                    Id: { forma.values.req }
                </p>
                <p>
                    Req Status:
                </p>
                <p>
                    Status:
                </p>
                <p>
                    URLs:
                </p>
                
            </div>
    </form>
  )
}

export default App;
