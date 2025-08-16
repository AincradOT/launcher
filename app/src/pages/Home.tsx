import { Button } from '@/components/ui/Button';
import { useElectron } from '@/hooks/useElectron';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export function Home() {
  const { appVersion, appName, isElectron } = useElectron();
  const [count, setCount] = useLocalStorage('home-count', 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to {appName || 'Aincrad Launcher'}
          </h1>
          {isElectron && (
            <p className="text-lg text-muted-foreground">
              Version {appVersion || '1.0.0'}
            </p>
          )}
        </header>

        <main className="max-w-2xl mx-auto">
          <div className="bg-card rounded-lg border p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <p className="text-muted-foreground mb-4">
              This is your new Electron application built with React,
              TypeScript, and Vite. Start building amazing desktop applications!
            </p>

            <div className="flex gap-4">
              <Button onClick={() => setCount(count + 1)}>
                Count is {count}
              </Button>
              <Button variant="outline" onClick={() => setCount(0)}>
                Reset Count
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-xl font-semibold mb-3">Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Modern React with TypeScript</li>
                <li>• Electron for desktop apps</li>
                <li>• Vite for fast development</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Custom hooks and utilities</li>
              </ul>
            </div>

            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-xl font-semibold mb-3">Next Steps</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Add your app logic</li>
                <li>• Create more components</li>
                <li>• Set up routing</li>
                <li>• Add state management</li>
                <li>• Customize the UI</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
