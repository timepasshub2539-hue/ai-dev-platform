"""AI Channel Co-Pilot backend — episode 2: architecture skeleton.

Real agent tools (YouTube API, scoring, etc.) get added incrementally in
later episodes, not scaffolded ahead of time here.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Channel Co-Pilot")

# dashboard dev server (Vite default) talks to this API cross-origin during
# local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "ai-channel-copilot-backend"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
