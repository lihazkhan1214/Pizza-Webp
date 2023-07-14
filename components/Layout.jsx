import Navabar from "./Navabar"
import Footer from "./Footer"

function Layout({children}) {
  return (
    <>
    <Navabar></Navabar>
{children}
  <Footer/>
    
    
    
    
    </>
  )
}

export default Layout