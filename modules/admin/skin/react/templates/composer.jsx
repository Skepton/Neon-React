module.exports = (component) =>
 <div id="editor" className="composer-editor">
  <div className="composer-editor__bar">
    <input id="delete-form-submit" type="submit" value="delete" onClick={component.deletePost} />
    <input id="composer-form-submit" type="submit" value="save" onClick={component.savePost} />
  </div>
  <div className="composer-editor__content">

    <form id="composer-form" className="composer-editor__form">
      <input id="header-image" type="hidden" name="header" value={component.state.post.header} />
      <div className="input-box title">
        <div className="input-box__container">
          <label htmlFor="headline">Title</label>
          <input id="headline" type="text" className="input-div" name="headline" placeholder="What is it about?" required onInput={component.handleHeadlineUpdate.bind(component)} value={component.state.post.headline} />
        </div>
      </div>

      <div className="input-box content">
        <div className="input-box__container">
          <label htmlFor="body">Content</label>
          <div id="body" name="body" className="input-div">
            { component.state.renderedComposerList.length > 0 ?
              <div className="body-inner-wrapper">
                {component.state.renderedComposerList.map((widget) => <div className="widget-wrapper">{widget}</div>)}
              </div> :
              <div className="body-inner-wrapper">{component.addWidgetElement}</div>
            }
          </div>
        </div>
      </div>

      <div className="input-box misc">
        <div className="input-box__container input-box__container--half">
          <label htmlFor="source">Source</label>
          <input id="source" type="text" name="source" value={component.state.post.source} placeholder="Story credits goes to" autoComplete="off"/>
        </div>

        <div className="input-box__container input-box__container--half">
          <label htmlFor="tags">Tags</label>
          <input id="tags" type="text" name="tags" value={component.state.post.tags} placeholder="Tags" autoComplete="off"/>
        </div>
      </div>

      <div className="input-box category">
        <select name="category">
          <option value="">No Category</option>
        </select>
      </div>

      <p>No categories - please add a category using the <a href="/admin/settings/categorizer">Categorizer</a></p>
    </form>

    <div id="composer-preview" className="composer-editor__preview">
      <div id="composer-preview__container"></div>
    </div>

  </div>
</div>
