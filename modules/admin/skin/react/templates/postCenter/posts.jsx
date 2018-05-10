import {Link} from 'react-router-dom'

module.exports = (component) =>
<div className="post-center-list">
  {component.state.posts.map((post) =>
    <article className="post-center__list--item">
      { post.headline ?
        <h2 className="headline truncate"><Link to={'/admin/posts/composer/' + post.hashid}>{post.headline}</Link></h2> :
        <h2 className="headline truncate"><Link to={'/admin/posts/composer/' + post.hashid}>This post does not have a headline... yet!</Link></h2>
      }

      { post.body ?
        <p className="body truncate">{post.body}</p> :
        <p className="body truncate">This could be the start of the article</p>
      }

      <div className="post-info">
        <span className="author">By: {post.author.displayname}</span>
        <span className="separator"> - </span>
        <span className="date" data-raw-date="{post.postDate}" title="">{post.postDate}</span>
      </div>
    </article>
  )}
  { component.state.posts.length <= 0 ? <p className="no-posts notice">No articles written yet!</p> : '' }
</div>
