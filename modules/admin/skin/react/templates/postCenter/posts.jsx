import {Link} from 'react-router-dom'

module.exports = (component) =>
<div class="post-center-list">
  {component.state.posts.map((post) =>
    <article class="post-center__list--item">
      { post.headline ?
        <h2 class="headline truncate"><Link to="/admin/posts/composer/{post.hashid}">{post.headline}</Link></h2> :
        <h2 class="headline truncate"><Link to="/admin/posts/composer/{post.hashid}">This post does not have a headline... yet!</Link></h2>
      }

      { post.body ?
        <p class="body truncate">{post.body}</p> :
        <p class="body truncate">This could be the start of the article</p>
      }

      <div class="post-info">
        <span class="author">By: {post.author.displayname}</span>
        <span class="separator"> - </span>
        <span class="date" data-raw-date="{post.postDate}" title="">{post.postDate}</span>
      </div>
    </article>
  )}
  { component.state.posts.length <= 0 ? <p class="no-posts notice">No articles written yet!</p> : '' }
</div>
