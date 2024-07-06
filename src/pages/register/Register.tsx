import Navbar from "../../components/navbar/Navbar"
import authImage from "../../assets/images/auth/authimg.png"

const Register = () => {
  return (
    <div>
      < Navbar />


      <div className="hero-content flex-col lg:flex-row-reverse gap-8 h-fit">
        <div className="card bg-base-100 w-full lg:w-[40%] shadow-2xl">
          <form className="card-body">
            <div className="form-control">
              <input type="text" placeholder="fullname" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <input type="email" placeholder="email" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <input type="string" placeholder="phone number" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <input type="password" placeholder="password" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <input type="password" placeholder="confirm password" className="input input-bordered" required />
            </div>
            <div>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>

            <div className="form-control mt-2">
              <button className="btn bg-webcolor text-text-light hover:text-black border-none">Register</button>
            </div>

            <div className="form-control mt-2">
              <a href="#" className="label-text-alt link link-hover">Already have an account? Login</a>
            </div>

          </form>
        </div>


        {/* on small screens, do not show the image */}
        <div className="hidden lg:block w-full lg:w-[40%] h-96 ">
          <img src={authImage} alt="auth" className="w-full h-full object-cover lg:object-fill rounded-lg" />
        </div>

      </div>
    </div>


  )
}

export default Register