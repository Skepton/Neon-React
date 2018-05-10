module.exports = (component) =>
<textarea onInput={component.onUpdate.bind(component)} placeholder={component.state.placeholder}>
  {component.state.data.text}
</textarea>
