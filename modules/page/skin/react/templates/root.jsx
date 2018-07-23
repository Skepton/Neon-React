module.exports = (component) =>
<div className="page__wrapper">
  {component.children.header}
  <main className="page__content">
    {component.children.content}
  </main>
</div>
