import {Link} from 'react-router-dom'
import {Fragment} from 'react'

module.exports = (component) =>
<Fragment>
  {!component.state.loggedIn ? <Link to="/login" className="button__primary">Log in</Link> : <form action="/logout" method="post" className="button__primary"><button type="submit">Log out</button></form>}
</Fragment>
