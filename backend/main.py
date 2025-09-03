from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import contextlib
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CodeRequest(BaseModel):
    code: str


@app.post("/api/run")
def run_code(request: CodeRequest):
    stream = io.StringIO()
    with contextlib.redirect_stdout(stream):
        try:
            exec(request.code, {})
        except Exception as exc:  # pragma: no cover - simple example
            print(f"Error: {exc}")
    return {"output": stream.getvalue()}
