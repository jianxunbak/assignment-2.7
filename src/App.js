import Product from "./components/Product";
import { ProductProvider } from "./context/ProductContext";
import { ModeProvider } from "./context/ModeContext";
import "./App.css";
import UserBar from "./components/UserBar";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <div className="App">
      <ModeProvider>
        <UserProvider>
          <UserBar />
        </UserProvider>
        <ProductProvider>
          <Product />
        </ProductProvider>
      </ModeProvider>
    </div>
  );
}

export default App;
