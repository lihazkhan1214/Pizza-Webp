import React from 'react';
import styles from "../styles/Navabar.module.css"
import Image from 'next/image';
import Link from 'next/link';
import { UseSelector, useSelector } from 'react-redux';
function Navabar() {
  const quantity=useSelector((state)=>state.cart.quantity);
  return (
    <div className={styles.Container}>

      <div className={styles.item}>
        <button className="callButton">

          <Image src="/images/telephone.png" style={{ borderRadius: "50%" }} width="32" height="32" alt="" />



        </button>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>012 345 678</div>
        </div>


      </div>

      <div className={styles.item}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
          <Link href='/' style={{textDecoration:"none",color:"#FFF"}}>Homepage</Link></li>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          <Image src="/images/logo.png" alt="" width="160" height="69" />
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <Link href="/cart" passHref>
      <div className={styles.item}>
        <div className={styles.cart}>
          <Image src="/images/cart.png" alt="" width="30" height="30" />
          <div className={styles.counter}>{quantity}</div>
        </div>
      </div>
      </Link>
    </div>
  )
}

export default Navabar;