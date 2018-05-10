module.exports = (component) =>
<div>
  {component.children.header}
  <main className="main-content">
    {component.children.content}
  </main>
</div>
