import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const userCredentials = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userCredentials),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form 
          className="space-y-6 border border-color-[#fff] shadow-md p-6 rounded-[12px]"
          action="#"
          method="POST"
          onSubmit={handleLogin}
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sing in to your account
            </h2>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                value={password}  
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
          <hr className="mt-5 border-gray-500" />
          <p className="mt-10 text-center text-sm/6 text-gray-500 ">
            You don't have an account?
            <br />
            <a
              onClick={() => navigate("/register")}
              className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
            >
              Sing up free
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
