module.exports = (component) =>
<textarea onInput={component.onUpdate.bind(this)} placeholder="{component.state.placeholder}">{component.state.data.text}</textarea>
