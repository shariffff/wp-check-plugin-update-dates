
import { CodeBlock } from "./code-block"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
const jsCode = `console.log([...document.querySelectorAll('#the-list tr[data-slug]')].map(row => row.getAttribute('data-slug')).join('\\n'));`

const bashCode = `wp plugin list --field=name`

export default function SimpleCopy() {
  return (

<Collapsible>
  <CollapsibleTrigger className="text-blue-400 text-xs">How to get the plugins list?</CollapsibleTrigger>
  <CollapsibleContent>
  <div className="mt-4">
          <h3 className="text-xs font-semibold mb-2">JavaScript - Visit the Installed plugins page and  paste the code into the browser's console</h3>
          <CodeBlock code={jsCode} />
        </div>
        <div>
          <h3 className="text-xs font-semibold mb-2">WP CLI</h3>
          <CodeBlock code={bashCode} />
        </div>
  </CollapsibleContent>
</Collapsible>


  )
}
