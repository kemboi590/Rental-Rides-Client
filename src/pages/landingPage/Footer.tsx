
const Footer = () => {
  return (
    <footer className="footer bg-gray-800 text-text-light p-10">
    <nav>
      <h6 className="footer-title">Services</h6>
      <a className="link link-hover">Car Rental</a>
      <a className="link link-hover">Car Leasing</a>
      <a className="link link-hover">Car Sales</a>
      <a className="link link-hover">Car Insurance</a>
    </nav>
    <nav>
      <h6 className="footer-title">Company</h6>
      <a className="link link-hover">About us</a>
      <a className="link link-hover">Dashboard</a>
      <a className="link link-hover">Services</a>
      <a className="link link-hover">Contact us</a>
    </nav>
    <nav>
      <h6 className="footer-title">Legal</h6>
      <a className="link link-hover">Terms of use</a>
      <a className="link link-hover">Privacy policy</a>
      <a className="link link-hover">Cookie policy</a>
    </nav>
  </footer>
  )
}

export default Footer