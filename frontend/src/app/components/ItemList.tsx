interface Item {
    id: number;
    name: string;
    description: string;
  }
  
  interface ItemListProps {
    items: Item[];
    onDelete: (id: number) => void;
    onEdit: (item: Item) => void;
  }
  
  const ItemList = ({ items, onDelete, onEdit }: ItemListProps) => {
    return (
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <div>
              <strong>{item.name}</strong>
              <p>{item.description}</p>
            </div>
            <div>
              <button onClick={() => onDelete(item.id)}>Delete</button>
              <button className="edit-button" onClick={() => onEdit(item)}>
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  
  export default ItemList;