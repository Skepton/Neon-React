import {Link} from 'react-router-dom'

module.exports = (component) =>
<div>
  {!component.state.loggedIn ? <Link to="/login" className="button__primary">Log in</Link> : <form action="/logout" method="post"><button type="submit" className="button">Log out</button></form>}
</div>
