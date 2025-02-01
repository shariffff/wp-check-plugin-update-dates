import PluginChecker from "@/components/PluginChecker";

export default function Home() {
  return (
    <main className="container mx-auto  p-4 max-w-5xl">
      <PluginChecker />
      <footer className="text-xs py-4">
        <a target="_blank" href="https://github.com/shariffff/wp-check-plugin-update-dates" className="text-gray-400">Looking to contribute or have suggestions? </a>
      </footer>
    </main >
  );
}
