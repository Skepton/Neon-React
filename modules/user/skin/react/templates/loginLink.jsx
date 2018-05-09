import {Link} from 'react-router-dom'

module.exports = (component) =>
<li>
  {!component.state.loggedIn ? <Link to="/login">Log in</Link> : <form action="/logout" method="post"><button type="submit">Log out</button></form>}
</li>
