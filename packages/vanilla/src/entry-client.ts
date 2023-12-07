export async function render() {
  console.log('render from entry-client')
  const root = document.getElementById(
    "root"
  )
  if (root) root.innerHTML += `\nHello from client!`;
}

render()
