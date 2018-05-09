module.exports = (component) =>
<div className="list">
  {component.children.map((child) =>
    <div className="list--item">{child.component}</div>
  )}
</div>
