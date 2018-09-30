module.exports = (component) =>
<ul className="navigation-list top">
  {component.props.children.map((child) =>
    <li className="navigation-list__item-wrapper" key={child.name}><child.class layout={child.layout} template={child.template} children={child.children} /></li>
  )}
</ul>
