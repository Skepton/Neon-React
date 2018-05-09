module.exports = (component) =>
<header id="header" className="header">
  <div className="contentWidth">
    <a className="header-logo" href="/"><img src={component.logoSrc} /></a>
    <ul className="header-links">{component.children.headerLinks}</ul>
  </div>
</header>
