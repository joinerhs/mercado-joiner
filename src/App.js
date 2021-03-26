import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from "react";
import productService from "./services/list"
import {Link } from "react-router-dom";

function App() {
  const [valueImput, setValueImput] =useState("");
  const [products, setProducts] = useState([]);
  const [toSearch, setToSearch] = useState("deportes");
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
    if(e.target.id === 'siguiente'){
      setOffset(offset+50);
    }else if(offset===0 && e.target.id === 'anterior'){
    
    }else if(e.target.id === 'anterior'){
      setOffset (offset-50);
    }
  }

  return (
    <div className="App">
      <div className="encabezado">
        <h1 className="titulo">Mercado Joiner</h1>
      </div>
      <form className="barra_buscar" onSubmit={submitHandler}>
        <input  type="search" onChange={changeHandler} value={valueImput}></input>
        <button onClick={changeHandler} value={valueImput}>Buscar</button>
      </form> 
      <div className="division">     
        {products.map(product => {
          return(
            <Link to={`./Info:${product.id}`}>  
              <div className="info">            
                <div className="product_id" key={product.id}>            
                  <p>{product.title}</p>
                  <img className="img" src={product.thumbnail}></img>
                  <p>Precio ${product.price}</p>
                </div> 
              </div>         
            </Link>        
          )
        })}
      </div>
      <button onClick={modifyOffset} id="anterior">Anterior</button>
      <button onClick={modifyOffset} id="siguiente">Siguiente</button>
    </div>
  );
}

export default App;
