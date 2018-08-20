module.exports = (component) =>
<div className="page__content--inner ng__row ng__row--dir-col ng__row--hz-center register">
	<h1 className="page__title ng__col--6">Register</h1>
	<form role="form" method="post" className="ng__col--6 form" onSubmit={component.handleSubmit}>
		<div className="form__field form__field--first">
			<label for="username" className="form__field-label">Username</label>
			<input id="username" className="form__field-input" type="text" name="username" placeholder="BoatyMcBoatface" onChange={component.handleUsernameChange} autoFocus required />
		</div>
		<div className="form__field form__field--last">
			<label for="password" className="form__field-label">Password</label>
			<input id="password" className="form__field-input" type="password" name="password" placeholder="*********" onChange={component.handlePasswordChange} required />
		</div>
		<div className="form__actions">
			<button type="submit" className="button__primary--large form__actions-submit">Submit</button>
		</div>
	</form>
</div>