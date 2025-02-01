from fastapi import FastAPI
from app.review.reviewController import router as review_router
from app.database import create_tables
import uvicorn
app = FastAPI()

app.include_router(review_router)

@app.get("/")
async def root():
    return {"message": "Chrome Legal Backend Has Booted Up"}

def main():
    create_tables()
    return

if __name__ == "__main__":
    main()