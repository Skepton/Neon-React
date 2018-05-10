module.exports = (component) =>
<ul className="navigation-list top">
  {component.children.map((child) =>
    <li className="navigation-list__item-wrapper" key={child.name}>{child.component}</li>
  )}
</ul>
