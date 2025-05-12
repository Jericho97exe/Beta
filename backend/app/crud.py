from sqlalchemy.orm import Session
from . import models, schemas

def get_cart_items(db: Session):
    return db.query(models.CartItem).all()

def add_to_cart(db: Session, cart_item: schemas.CartItemCreate):
    db_cart_item = db.query(models.CartItem).filter(models.CartItem.product_id == cart_item.product_id).first()
    if db_cart_item:
        db_cart_item.quantity += cart_item.quantity
    else:
        db_cart_item = models.CartItem(product_id=cart_item.product_id, quantity=cart_item.quantity)
        db.add(db_cart_item)
    db.commit()
    db.refresh(db_cart_item)
    return db_cart_item

def update_cart_item(db: Session, cart_item_id: int, cart_item: schemas.CartItemUpdate):
    db_cart_item = db.query(models.CartItem).filter(models.CartItem.id == cart_item_id).first()
    if db_cart_item:
        db_cart_item.quantity = cart_item.quantity
        db.commit()
        db.refresh(db_cart_item)
    return db_cart_item

def remove_from_cart(db: Session, cart_item_id: int):
    db_cart_item = db.query(models.CartItem).filter(models.CartItem.id == cart_item_id).first()
    if db_cart_item:
        db.delete(db_cart_item)
        db.commit()
    return db_cart_item