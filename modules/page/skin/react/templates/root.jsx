module.exports = (component) =>
<div className="admin-wrapper">
  {component.children.header}
  <main className="main-content">
    {component.children.content}
  </main>
</div>
