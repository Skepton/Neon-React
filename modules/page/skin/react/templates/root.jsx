module.exports = (component) =>
<div class="admin-wrapper">
  {component.children.header}
  <main class="main-content">
    {component.children.content}
  </main>
</div>
