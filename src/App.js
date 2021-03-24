import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from "react";
import productService from "./services/list"

function App() {
  const [valueImput, setValueImput] =useState("");
  const [products, setProducts] = useState([]);
  const [toSearch, setToSearch] = useState("");
  const [offset, setOffset] = useState(0);

  const changeHandler = (event) => {
    setValueImput(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault()
    setToSearch(valueImput);
  };
  //Cada vez que hay un cambio de estado, react re-renderiza el componente que cambio

  useEffect(() => {
    productService.getProducts(toSearch, offset).then(result => setProducts(result.results));        
  }, [toSearch, offset]);


  const modifyOffset = e => {
    if(e.target.id === 'subir'){
      setOffset(offset+50);
    }else if(offset===0 && e.target.id === 'bajar'){
    
    }else if(e.target.id === 'bajar'){
      setOffset (offset-50);
    }
  }

  return (
    <div className="App">
      <h1>Mercado Joiner</h1>
      <form onSubmit={submitHandler}>
        <input  type="search" onChange={changeHandler} value={valueImput}></input>
      </form>      
      {products.map(product => {
        return(
        <div key={product.id}>
          <p>{product.title}</p>
          <img src={product.thumbnail}></img>
          <p>Precio ${product.price}</p>
        </div>
        
        )
      })}
      <button onClick={modifyOffset} id="bajar">Bajar</button>
      <button onClick={modifyOffset} id="subir">Subir</button>
    </div>
  );
}

export default App;
