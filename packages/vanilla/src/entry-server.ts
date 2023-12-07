import { execSync } from 'child_process'

export async function render() {
  // Command to list directory structure using ls and filter out node_modules
  const command = "ls -R | grep -v 'node_modules'";

  const output = execSync(command, { encoding: 'utf8' });

  return `Hello from Server!
<br>
Directory structure:
<pre>
${output}
</pre>
`

}
