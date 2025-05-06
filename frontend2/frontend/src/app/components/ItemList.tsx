interface Item {
    id: number;
    name: string;
    description: string;
  }
  
  interface ItemListProps {
    items: Item[];
    onDelete: (itemId: number) => void;
  }
  
  export default function ItemList({ items, onDelete }: ItemListProps) {
    return (
      <div>
        <h2>Lista de Items</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <span>{item.name}: {item.description}</span>
              <button onClick={() => onDelete(item.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }