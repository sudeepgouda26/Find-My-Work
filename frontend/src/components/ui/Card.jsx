export function Card({ children }) {
    return <div className="p-4 bg-stone-200 rounded-lg border-black-100">{children}</div>;
  }
  
  export function CardContent({ children }) {
    return <div className="p-2">{children}</div>;
  }