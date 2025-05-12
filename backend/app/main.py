from fastapi import FastAPI, HTTPException
from prisma import Prisma
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import Request
from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import *
from pydantic import BaseModel

app = FastAPI()
prisma = Prisma()

# Especifica la ruta personalizada del esquema (relativa al directorio de trabajo)
prisma = Prisma(
    schema="frontend/prisma/schema.prisma",  # Ruta relativa o absoluta
)
# Asegúrate de que el cliente Prisma esté en la misma carpeta que tu archivo main.py
# o en una carpeta accesible desde el directorio de trabajo actual.

# Luego, genera el cliente manualmente (solo una vez)
prisma.generate()  # Esto crea el cliente en el directorio correcto

# Configura el middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Cambia esto si tu frontend está en otro dominio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await prisma.connect()

@app.on_event("shutdown")
async def shutdown():
    await prisma.disconnect()

class CartItemCreate(BaseModel):
    product_id: int
    quantity: int

@app.get("/cart/")
async def get_cart():
    cart_items = await prisma.cartitem.find_many(include={"product": True})
    return cart_items

@app.post("/cart/")
async def add_to_cart(cart_item: CartItemCreate):
    existing_item = await prisma.cartitem.find_first(
        where={"productId": cart_item.product_id}
    )
    if existing_item:
        updated_item = await prisma.cartitem.update(
            where={"id": existing_item.id},
            data={"quantity": existing_item.quantity + cart_item.quantity},
        )
        return updated_item
    new_item = await prisma.cartitem.create(
        data={"productId": cart_item.product_id, "quantity": cart_item.quantity}
    )
    return new_item

@app.delete("/cart/{cart_item_id}")
async def remove_from_cart(cart_item_id: int):
    deleted_item = await prisma.cartitem.delete(where={"id": cart_item_id})
    if not deleted_item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    return deleted_item