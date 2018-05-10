module.exports = (component) =>
<li className="admin-link">
  {component.state.user.admin ? <a href="/admin">Admin</a> : ''}
</li>
