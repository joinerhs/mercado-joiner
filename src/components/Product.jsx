import React,{Fragment,useState,useEffect} from 'react';
import './Product.css';

const Product = () => {
  let query = window.location.pathname;
  const enlace = query.split(":");
  const idProduct = enlace[1];

  const [product, setproduct] = useState([])
  const [seller, setseller] = useState('')
  const [detail, setdetail] = useState('')



  useEffect(()=>{
    fetch(`https://api.mercadolibre.com/items/${idProduct}`)
    .then(response => response.json())
    .then(product => setproduct(product))
    fetch(`https://api.mercadolibre.com/items/${idProduct}/descriptions`)
      .then(response => response.json())
      .then(data => setdetail(data[0].plain_text))
  },[idProduct])

  useEffect(()=>{
    fetch(`https://api.mercadolibre.com/users/${product.seller_id}`)
    .then(response => response.json())
    .then(seller => setseller(seller.nickname))
  },[product])
  return(
    <Fragment>      
      
      <div className="encabezado">
        <h1 className="titulo">Mercado Joiner</h1>
      </div>      

      <div className="contenedor_">
        {/* <div className="barra_izquierda">
        </div> */}
            <div className="contenedor-img">
              <img src={product.thumbnail} alt="Imagen del producto" className="img-product"></img>
            </div>

            <div className="contenedor-detalle">              
              <h3 className="p_name">{product.title}</h3>
              <h4 classNmae="p_precio"> Precio: ${product.price}</h4>
              <h5>Vendido por: {seller}</h5>
              <p>id {product.id}</p>
              <p>{detail}</p>
            </div>
            {/* <div className="barra_derecha">
            </div> */} 
      </div> 
          
      
    </Fragment>
)
}
 
export default Product;