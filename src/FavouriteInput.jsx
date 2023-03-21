export default function FavouriteInput ({ onChange: onInputChange, id }) {
	const inputHandler = event => onInputChange(event.target.value)

	return (
		<label htmlFor={id}>
      What is your favourite wild animal?
			<input id={id} onChange={inputHandler} />
		</label>
	)
}
