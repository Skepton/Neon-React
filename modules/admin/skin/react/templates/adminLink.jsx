module.exports = (component) =>
<li class="admin-link">
  <a href="/admin" rt-if="component.state.user.admin">Admin</a>
</li>
