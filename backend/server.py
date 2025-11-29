from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import websocket

app = FastAPI()

# Configuração de CORS (Permite que o Frontend conecte no Backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, troque "*" pelo endereço do seu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclui a rota do websocket que criamos
app.include_router(websocket.router)

@app.get("/")
def read_root():
    return {"message": "API de Rastreamento de Ônibus Online 🚌"}

# Se rodar este arquivo direto, ele sobe o servidor
if __name__ == "__main__":
    import uvicorn
    # Roda na porta 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)
