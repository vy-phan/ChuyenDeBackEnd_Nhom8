import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className="footer footer-center bg-base-300 text-base-content py-7 mt-1">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by NetTrom</p>
        </aside>
      </footer>
    </>
  )
}

export default Footer
