import { JSX, FC, ChangeEvent } from 'react'

interface Props {
  name: string
  type?: string
  placeholder?: string
  value?: string
  onChange: (fieldName: string, value: string) => void
}

const Input: FC<Props> = ({ name, value, onChange, type, placeholder }) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    onChange(name, e.currentTarget.value)
  }

  const renderTextInput = () => {
    return (
      <input
        className="rounded border p-2"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleOnChange(e)}
      />
    )
  }

  const renderPhoneInput = () => {
    return (
      <input
        className="rounded border p-2"
        type="tel"
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleOnChange(e)}
      />
    )
  }

  const renderEmailInput = () => {
    return (
      <input
        className="rounded border p-2"
        type="email"
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleOnChange(e)}
      />
    )
  }

  const renderInput = () => {
    const inputTypes: { [key: string]: () => JSX.Element } = {
      text: renderTextInput,
      phone: renderPhoneInput,
      email: renderEmailInput
    }

    if (!type || !inputTypes[type]) {
      return renderTextInput()
    }

    return inputTypes[type]()
  }

  return <div>{renderInput()}</div>
}

export default Input
