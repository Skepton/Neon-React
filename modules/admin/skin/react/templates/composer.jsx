module.exports = (component) =>
 <div id="editor" class="composer-editor">
  <div class="composer-editor__bar">
    <input id="delete-form-submit" type="submit" value="delete" onClick="{component.deletePost}" />
    <input id="composer-form-submit" type="submit" value="save" onClick="{component.savePost}" />
  </div>
  <div class="composer-editor__content">
    <form id="composer-form" class="composer-editor__form">

      <input id="header-image" type="hidden" name="header" value="{component.state.post.header}" />

      <div class="input-box title">
        <div class="input-box__container">
          <label for="headline">Title</label>
          <div id="headline" type="text" class="input-div" name="headline" placeholder="What is it about?" required autocomplete="off" contenteditable="true" onInput="{component.handleHeadlineUpdate.bind(this)}">{component.state.post.headline}</div>
        </div>
      </div>

      <div class="input-box content">
        <div class="input-box__container">
          <label for="body">Content</label>
          <div id="body" name="body" class="input-div">
            <div class="body-inner-wrapper" rt-if="this.state.renderedComposerList.length > 0"><div class="widget-wrapper" rt-repeat="widget in this.state.renderedComposerList">{widget}</div></div>
            <div class="body-inner-wrapper" rt-if="!this.state.renderedComposerList.length > 0">{component.addWidgetElement}</div>
          </div>
        </div>
      </div>

      <div class="input-box misc">
        <div class="input-box__container input-box__container--half">
          <label for="source">Source</label>
          <input id="source" type="text" name="source" value="{component.state.post.source}" placeholder="Story credits goes to" autocomplete="off"/>
        </div>

        <div class="input-box__container input-box__container--half">
          <label for="tags">Tags</label>
          <input id="tags" type="text" name="tags" value="{component.state.post.tags}" placeholder="Tags" autocomplete="off"/>
        </div>
      </div>

      <div class="input-box category">
        <select name="category">
          <option value="">No Category</option>
        </select>
      </div>

      <p>No categories - please add a category using the <a href="/admin/settings/categorizer">Categorizer</a></p>

    </form>

    <div id="composer-preview" class="composer-editor__preview">
      <div id="composer-preview__container"></div>
    </div>

  </div>
</div>
