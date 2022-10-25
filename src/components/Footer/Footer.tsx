import React from 'react'
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <p>Desenvolvido por <a href='https://www.dian.ga' target="_blank" rel="noreferrer">Dian Novais</a> © 2022</p>
    </footer>
  )
}

export default Footer