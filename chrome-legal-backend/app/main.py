from fastapi import FastAPI
from .review.reviewController import router as review_router
from .database import create_tables
import uvicorn
app = FastAPI()

app.include_router(review_router)

@app.get("/")
async def root():
    return {"message": "Chrome Legal Backend Has Booted Up"}

def main():
    create_tables()
    uvicorn.run(app, host="0.0.0.0", port=8000)

if __name__ == "__main__":
    main()