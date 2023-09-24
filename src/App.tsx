import { useEffect, useState } from 'react'
import { validateField } from 'utils/validations'

import Button from 'components/Button'
import Input from 'components/Input'

import './styles.css'

interface StringObject {
  [key: string]: string
}

const fields = [
  {
    fieldName: 'name',
    type: 'text',
    placeholder: 'Contact Name'
  },
  {
    fieldName: 'phone',
    type: 'phone',
    placeholder: 'Mobile Number'
  },
  {
    fieldName: 'email',
    type: 'text',
    placeholder: 'Email'
  }
]

const requiredFields = ['name', 'phone', 'email']

function App() {
  const [contacts, setContacts] = useState<StringObject[]>([])
  const [formValues, setFormValues] = useState<StringObject>({})
  const [errors, setErrors] = useState({})
  const hasErrors = Object.keys(errors).length > 0

  useEffect(() => {
    for (const [key, value] of Object.entries(formValues)) {
      const error = validateField(key, value as string)

      setErrors((prevErrors) => {
        if (!error) {
          let newErrors: StringObject = { ...prevErrors }
          delete newErrors[key]

          return { ...newErrors }
        }

        return { ...prevErrors, [key]: error }
      })
    }
  }, [formValues])

  const handleChangeFormValues = (fieldName: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value
    }))
  }

  const addContact = () => {
    if (
      hasErrors ||
      !(
        Object.keys(formValues).every((field) =>
          requiredFields.includes(field)
        ) && requiredFields.length === Object.keys(formValues).length
      )
    ) {
      return
    }

    setContacts((prevContacts) => [...prevContacts, formValues])
    setFormValues({})
  }

  return (
    <div className="app-container w-full">
      <div className="header m-auto shadow bg-slate-800 mb-4">
        <h1 className="text-center text-white pt-2">
          Oracle Technical Exam - Phone Directory - Developed in React by Juan
          Alphonso D. Maligad
        </h1>
      </div>
      <div className="form-container space-y-4 m-auto">
        <div className="flex space-x-2 m-auto">
          {fields.map(({ fieldName, type, placeholder }) => (
            <Input
              key={fieldName}
              name={fieldName}
              type={type}
              placeholder={placeholder}
              value={formValues[fieldName] || ''}
              onChange={handleChangeFormValues}
            />
          ))}
          <Button label="Add Contact" onClick={addContact} />
        </div>
        <div
          className={hasErrors ? 'block text-red-500' : 'hidden'}
          id="error"
          data-testid="error"
        >
          Invalid Input!
        </div>
        <div className="border p-8 space-y-4">
          <h1>Contacts Summary</h1>
          <table className="w-full ">
            <thead>
              <tr className="text-left">
                <th>Name</th>
                <th>Mobile Number</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(({ name, phone, email }) => {
                return (
                  <tr key={Math.floor(Math.random() * 10000)}>
                    <td>{name}</td>
                    <td>{phone}</td>
                    <td>{email}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
