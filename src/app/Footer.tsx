import Link from "next/link";

export default function Footer() {
  return (
    <footer className= "bg-neutral p-10 text-neutral-content">
        <div className="footer m-auto flex justify-center gap-10">
            <div>
                <a href="/" className="link-hover link">Explore Products</a>
            </div>
            <div>
                <a href="/cart" className="link-hover link">Your Cart</a>
            </div>
        </div>
        <div
          className="text-white flex justify-center mt-10">
          <p>Made with ❤ by </p>
          <Link
            className="ms-1 underline" 
            href="https://www.linkedin.com/in/rudra-vashishtha-7622a3217/"
          >
            Rudra Vashishtha
          </Link>
        </div>
    </footer>
  )
}
