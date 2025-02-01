from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.review.reviewService import generate_result
router = APIRouter()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    try:
        await websocket.accept()
        print("Client connected")
        while True:
            data = await websocket.receive_json()
            print(f"Received message: {data}")
            result = generate_result("", data["message"], data["chat_history"])
            print(f"Result: {result}")
            await websocket.send_json({"name": "Bot", "message": f"{result}"})
    except WebSocketDisconnect:
        print("Client disconnected")
