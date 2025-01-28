import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock } from "./code-block"

const jsCode = `console.log([...document.querySelectorAll('#the-list tr[data-slug]')].map(row => row.getAttribute('data-slug')).join('\\n'));`

const bashCode = `wp plugin list --field=name`

export default function SyntaxHighlightedCopy() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Code Snippets</CardTitle>
        <CardDescription>JavaScript and Bash code with syntax highlighting</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">JavaScript</h3>
          <CodeBlock code={jsCode} language="javascript" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Bash</h3>
          <CodeBlock code={bashCode} language="bash" />
        </div>
      </CardContent>
    </Card>
  )
}

