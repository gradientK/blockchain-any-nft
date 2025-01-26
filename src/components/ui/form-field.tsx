export default function CustomForm({ ...fromProps }) {
  return (
    <input
      type={'text'}
      placeholder={fromProps.placeholder}
      value={fromProps.value}
      onChange={fromProps.onChange}
      name={fromProps.name}
    />
  )
}
