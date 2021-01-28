import React, { useState, useEffect } from 'react'
import BackEnd from '../BackEnd.jsx'
const { Sequelize, DataTypes } = require('sequelize')

const Keyword = require('../DB/models/keyword')
const sequelize = new Sequelize({ dialect: 'sqlite', storage: '../../Keywords.db' })
const keywords = Keyword(sequelize, DataTypes)

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
      keyword: ''
    },

    validate: function (values) {
      const errors = {};

      if(values.keyword.length < 1) {
        errors.keyword = 'Por favor, escrever uma requisisao'
      }
    
      return errors
    
    }

  })
  
  return (
   <form onSubmit={(e) => {
     e.preventDefault()


    const send = BackEnd.post('/crawl', async (req, res) => {
        const newKeyword = await keywords.create({
          keyword: forma.values
          })
          res.json(newKeyword)
      }) 

      // const ans = BackEnd.get(`/crawl/${id}`, async (req, res) => {
      //   const keywordId = req.params.id
      //   const newKeywordId = await keywords.create({
      //     id: keywordId
      //   })
      //   res.json({ newKeywordId })
      // })
  }}>

     <div>
       <input
        type="text"
        placeholder="Requisisao"
        name="keyword"
        id="keyword"
        onChange={forma.handleChange}
        value={forma.values.keyword}
        />
        <br/>	
        {forma.errors.keyword && <span className="formaField_error">{forma.errors.keyword}</span>}
      </div>
      <button type="submit">
        Cadastrar
      </button>
              <div onChange={forma.handleChange}>
                <p>
                    keyword: { forma.values.keyword }
                </p>
                <p>
                    Status:
                </p>
                <p>
                    Id:
                </p>
                
            </div>
    </form>
  )
}

export default App;
