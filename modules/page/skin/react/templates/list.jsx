module.exports = (component) =>
<div className="list">
  {component.children.map((child) =>
    <div className="list--item" key={child.name}>{child.component}</div>
  )}
</div>
