import {Link} from 'react-router-dom'

module.exports = (component) =>
<li>
  { !component.state.isLoggedIn ? <Link to="/register">Register</Link> : ''}
</li>
