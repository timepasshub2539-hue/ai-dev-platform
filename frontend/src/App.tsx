import { useEffect, useState } from 'react'
import './App.css'

type Health = { status: string; service: string }

function App() {
  const [health, setHealth] = useState<Health | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/health')
      .then((r) => r.json())
      .then(setHealth)
      .catch(() => setError('backend unreachable — is it running on :8000?'))
  }, [])

  return (
    <main className="dashboard">
      <h1>AI Channel Co-Pilot</h1>
      <p className="subtitle">Episode 2: architecture skeleton — real backend connection, nothing more yet.</p>
      <div className="status-card">
        {health && <span className="ok">● backend connected — {health.service}</span>}
        {error && <span className="err">● {error}</span>}
        {!health && !error && <span>connecting…</span>}
      </div>
    </main>
  )
}

export default App
