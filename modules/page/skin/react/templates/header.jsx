import {Link} from 'react-router-dom'

module.exports = (component) =>
<header id="header" className="header__wrapper">
  <div className="header__content">
    <Link to="/" className="header__logo"><span className="logo-text"><span className="capital">N</span><span className="subhead">eon</span></span></Link>
    {component.children.categoryLinks}
    <nav className="header__links"
         onMouseEnter={component.openLinksMenu.bind(component)}
         onMouseLeave={component.closeLinksMenu.bind(component)}>
      <div className={"button__menu" + (component.state.linksMenuOpen ? ' button__menu--open' : ' button__menu--closed')} >
        <button className="button__meny-trigger button__primary">My Account</button>
        {component.children.headerLinks}
      </div>
    </nav>
  </div>
</header>
