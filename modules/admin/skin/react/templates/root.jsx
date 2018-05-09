module.exports = (component) =>
<div>
  {component.children.header}
  <main class="main-content">
    {component.children.content}
  </main>
</div>
