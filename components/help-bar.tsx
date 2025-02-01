import { CodeBlock } from "./code-block"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"

const jsCode = "window.open(`https://plugin-status.vercel.app/?plugins=${[...document.querySelectorAll('#the-list tr[data-slug]')].map(r=>r.getAttribute('data-slug')).join(',')}`,'_blank');"


const bashCode = `wp plugin list --field=name`

export default function HelpBar() {
  return (
    <>
      <Drawer>
        <DrawerTrigger className="text-xs text-blue-400 inline-flex">How to get the plugins list?</DrawerTrigger>
        <DrawerContent>
          <div className="max-w-5xl mx-auto">
            <div className="mt-4">
              <h3 className="text-xs mb-2">JavaScript - Visit the Installed plugins page and  paste the code into the browser's console <a href="https://www.loom.com/share/4ec76251c1ce4615bc201631b6ab1d85" target="_blank" rel="noopener noreferrer" className="text-blue-400">See a Quick Video ^^</a></h3>
              <CodeBlock code={jsCode} />
            </div>
            <div className="my-4">
              <h3 className="text-xs mb-2">WP CLI</h3>
              <CodeBlock code={bashCode} />
            </div>
          </div>
        </DrawerContent>
      </Drawer>

    </>


  )
}
