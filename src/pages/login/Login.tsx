import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Navbar from "../../components/navbar/Navbar"
import authImage from "../../assets/images/auth/authimg.png"

type FormData = {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
})

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset
  } = useForm<FormData>({ resolver: yupResolver(schema) })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
  }
  return (
    <div>
         < Navbar />
         <div className="hero-content flex-col lg:flex-row-reverse gap-8 h-fit">
        <div className="card bg-base-100 w-full lg:w-[40%] shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            
            <div className="form-control">
              <input type="email" placeholder="email" className="input input-bordered" required {...register("email")}/>
              <p className="text-red-500">{errors.email?.message}</p>
            </div>

            <div className="form-control">
              <input type="password" placeholder="password" className="input input-bordered" required {...register("password")}/>
              <p className="text-red-500">{errors.password?.message}</p>
            </div>

            <div>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>

            <div className="form-control mt-2">
              <button type="submit" className="btn bg-webcolor text-text-light hover:text-black border-none">Login</button>
            </div>

            <div className="form-control mt-2">
              <a href="#" className="label-text-alt link link-hover">Don't have an account? Register</a>
            </div>

          </form>
        </div>

      
        <div className="hidden lg:block w-full lg:w-[40%] h-96 ">
          <img src={authImage} alt="auth" className="w-full h-full object-cover lg:object-fill rounded-lg" />
        </div>

      </div>
    </div>
  )
}

export default Login