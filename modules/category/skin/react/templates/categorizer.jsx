module.exports = (component) =>
<div className="categorizer layout">
  <div className="layout__bar">
    <button type="submit" className="button button__primary--small" onClick={component.showRootCategoryForm.bind(component)}>New Root Category</button>
  </div>

  <div className="layout__content">
    {component.state.showRootForm ?
      <div className="categorizer__root-form">
        <h2>Create Root Category</h2>
        <form role="form" className="new-root-form" onSubmit={component.newRootCategory.bind(component)}>

          <div className="input-box title">
            <div className="input-box__container">
              <label htmlFor="title">Category Title</label>
              <input id="title" type="text" name="title" placeholder="Category Title" onInput={component.handleFormInputUpdate.bind(component)}/>
            </div>
          </div>

          <button type="submit" value="newPost">Create</button>
        </form>
      </div> : ''
    }

    {component.state.showChildForm ?
      <div className="categorizer__child-form">
        <h2>Create Child Category for {component.state.parent.title}</h2>
        <form role="form" className="new-root-form" onSubmit={component.newChildCategory.bind(component, component.state.parent.id)}>

          <div className="input-box title">
            <div className="input-box__container">
              <label htmlFor="title">Category Title</label>
              <input id="title" type="text" name="title" placeholder="Category Title" onInput={component.handleFormInputUpdate.bind(component)}/>
            </div>
          </div>

          <button type="submit" value="newPost">Create</button>
        </form>
      </div> : ''
    }

    <h2>Categories</h2>
    <div className="category-tree">
      {component.state.categories.map((category) =>
        <div className={'category-tree__item' + (category.isRoot ? ' category-tree__item--root' : '')} key={category.id} style={{marginLeft: category.level * 1.5 + 'rem', marginRight: category.level * 1.5 + 'rem'}}>
          <div className="info-wrapper">
            <span className="title">{category.title}</span>
            <span className="slug">{category.slug}</span>
          </div>
          <span className="add-child-category" onClick={component.showChildCategoryForm.bind(component, category.id)}><i className="material-icons">add_box</i></span>
          <span className="remove-child-category" onClick={component.removeCategory.bind(component, category.id)}><i className="material-icons">indeterminate_check_box</i></span>
        </div>
      )}
      { component.state.categories.length <= 0 ? <p className="no-category notice">No categories exist!</p> : ''}
    </div>
  </div>
</div>
