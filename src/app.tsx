import React from "react";

function App() {
  const [count, setCount] = React.useState(1);
  return (
    <main>
      <button onClick={() => setCount(count + 1)}>Click me: {count}</button>
    </main>
  );
}

export default <App />;
