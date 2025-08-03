export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Chrome Extension Dev</h1>
      <p>Build with: npm run build-ext</p>
      <div className="mt-4 space-y-2">
        <div>
          <a href="/popup" className="text-blue-500">
            Popup Page
          </a>
        </div>
        <div>
          <a href="/options" className="text-blue-500">
            Options Page
          </a>
        </div>
      </div>
    </div>
  );
}
