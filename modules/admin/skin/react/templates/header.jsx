import {Link} from 'react-router-dom'

module.exports = (component) =>
<header id="header">
    <Link to="/admin" className="header-logo"><span className="logo-text"><span className="capital">N</span><span className="subhead">eon</span></span></Link>
    <nav  id="nav">
      {component.children.adminLinks}
    </nav>
</header>
