import {Link} from 'react-router-dom'

module.exports = (component) =>
<div>
  {!component.state.loggedIn ? <Link to="/register" className="button">Register</Link> : ''}
</div>
