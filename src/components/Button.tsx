import { FC, SyntheticEvent } from 'react'

interface Props {
  label?: string
  onClick: () => void
}

const Button: FC<Props> = ({ label, onClick }) => {
  const handleOnClick = (e: SyntheticEvent) => {
    e.preventDefault()

    onClick()
  }
  return (
    <div>
      <button
        className="rounded border bg-green-400 p-2 hover:bg-green-500"
        onClick={handleOnClick}
      >
        {label}
      </button>
    </div>
  )
}

export default Button
