from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users, cosmetics, personal_info

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://miroe-frontend.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(cosmetics.router, prefix="/cosmetics", tags=["cosmetics"])
app.include_router(personal_info.router, prefix="/personal", tags=["personal"])

@app.get("/")
def read_root():
    return {"message": "Miroé API is running!"}