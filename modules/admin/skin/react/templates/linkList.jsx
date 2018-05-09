module.exports = (component) =>
<ul class="navigation-list top">
  {component.children.map((child) =>
    <li class="navigation-list__item-wrapper" key={child.name}>{child.component}</li>
  )}
</ul>
