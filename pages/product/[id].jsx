import React, { useState } from 'react';
import styles from "../../styles/Product.module.css"
import Image from 'next/image';
import axios from 'axios';
import { useDispatch ,useSelector} from 'react-redux';
import { addProduct } from '../../redux/cartSlice';


function Product({ pizza }) {
  const dispatch=useDispatch();

  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.prices[0]);

  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);


  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };
  const handleClick=()=>{
    dispatch(addProduct({...pizza, extras, price, quantity}))

  }
  // const pizza = {
  //     id: 1,
  //     img: "/images/pizza.png",
  //     name: "CAMPAGNOLA",
  //     price: [19.9, 23.9, 27.9],
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, rhoncus fringilla vestibulum vel, dignissim vel ante. Nulla facilisi. Nullam a urna sit amet tellus pellentesque egestas in in ante.",
  // };
  const cart=useSelector((state)=>state.cart);
  console.log(cart);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgcontainer}>

          <Image src={pizza.img} objectFit="contain" layout="fill" />




        </div>

      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/images/size.png" layout="fill" />
            <span className={styles.number}>small</span>

          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/images/size.png" layout="fill" alt="" />
            <span className={styles.number}>meduim</span>

          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/images/size.png" layout="fill" alt="" />
            <span className={styles.number}>large</span>

          </div>



        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
         
          {
            pizza.extraOptions.map((option)=>(
              <div className={styles.option} key={option._id}>
              <input
              type="checkbox"
              id={option.text}
              name={option.text}
              className={styles.checkbox}
              onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor="cheese">{option.text}</label>
            </div>

            ))
          }
         
          
        </div>
        <div className={styles.add}>
          <input type="number" onChange={(e)=>setQuantity(e.target.value)} defaultValue={1} className={styles.quantity} />
          <button className={styles.button} onClick={handleClick}>Add to Cart</button>
        </div>


      </div>
    </div>
  )
}
export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
  return {
    props: { pizza: res.data, },
  };
}

export default Product;