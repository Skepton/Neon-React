import {Link} from 'react-router-dom'

module.exports = (component) =>
<header id="header">
    <Link to="/admin" className="header-logo"><span class="logo-text"><span class="capital">N</span><span class="subhead">eon</span></span></Link>
    <nav  id="nav">
      {component.children.adminLinks}
    </nav>
</header>
