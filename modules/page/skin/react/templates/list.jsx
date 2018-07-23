module.exports = (component) =>
<div className="list__wrapper">
  {component.props.children.map((child) =>
    <child.class layout={child.layout} template={child.template} children={child.children} />
  )}
</div>
