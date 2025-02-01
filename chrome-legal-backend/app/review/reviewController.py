from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    try:
        await websocket.accept()
        print("Client connected")
        while True:
            data = await websocket.receive_text()
            print(f"Received message: {data}")
            await websocket.send_json({"name": "Bot", "message": f"Message text was: {data}"})
    except WebSocketDisconnect:
        print("Client disconnected")
