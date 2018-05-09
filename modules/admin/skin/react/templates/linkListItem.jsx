import {Link} from 'react-router-dom'

module.exports = (component) =>
<div className={'navigation-list__item ' + (component.state.active ? 'navigation-list__item--active' : '')}>
  <Link to={component.layout.data.link}>{component.layout.data.label}</Link>
  {component.children.length > 0 ?
    <ul className="navigation-list">
      {component.children.map((child) =>
        <li className="navigation-list__item" key={child.name}>{child.component}</li>
      )}
    </ul> : ''
  }
</div>
