module.exports = (component) =>
<div className="admin__wrapper">
  {component.children.header}
  <main className="admin__content">
    {component.children.content}
  </main>
</div>
