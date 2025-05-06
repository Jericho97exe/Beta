from pydantic import BaseModel

# Esquema base que contiene los campos comunes para ItemCreate y ItemUpdate
class ItemBase(BaseModel):
    name: str
    description: str

# Esquema para la creación de un item
class ItemCreate(ItemBase):
    pass

# Esquema para la actualización de un item
class ItemUpdate(ItemBase):
    pass

# Esquema que se devuelve al cliente
class Item(ItemBase):
    id: int

    class Config:
        orm_mode = True