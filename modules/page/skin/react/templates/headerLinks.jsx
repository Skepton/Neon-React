module.exports = (component) =>
<div class="button__menu-list">
  {component.props.children.map((child) =>
    <div className="button__menu-list-item" key={child.name}><child.class layout={child.layout} template={child.template} children={child.children} /></div>
  )}
</div>
