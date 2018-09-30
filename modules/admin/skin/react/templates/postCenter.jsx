module.exports = (component) =>
<div className="post-center layout">
  <div className="post-center__bar layout__bar">
    <form role="form" className="new-post" onSubmit={component.newPost}>
        <button type="submit" value="newPost" className="button button__primary--small">New Post</button>
    </form>
  </div>
  <div className="post-center__content layout__content">
    {component.children.posts}
  </div>
</div>
