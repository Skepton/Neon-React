module.exports = (component) =>
<form role="form" method="post" onSubmit={component.handleSubmit}>
	<label for="username">Username</label>
	<input id="username" type="text" name="username" placeholder="Username" onChange={component.handleUsernameChange} autoFocus required />
	<label for="password">Password</label>
	<input id="password" type="password" name="password" placeholder="Password" onChange={component.handlePasswordChange} required />
	<button type="submit" >Submit</button>
</form>
