module.exports = (component) =>
<div className="post-center">
  <div className="post-center__bar">
    <form role="form" className="new-post" onSubmit={component.newPost}>
        <button type="submit" value="newPost">New Post</button>
    </form>
  </div>
  <div className="post-center__content">
    {component.children.posts}
  </div>
</div>
