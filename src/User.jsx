export default function User (props) {
	const { name, email } = props.user

	return (
		<div className="person">
			<h3>{name}</h3>
			<span>{email}</span>
		</div>
	)
}
