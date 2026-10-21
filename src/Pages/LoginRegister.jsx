import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";
import Container from "../Components/ui/Container";

// Floating-label input (same "peer" pattern used in Login.jsx / CreateAccount.jsx).
// The label sits inside the field and moves up into the border on focus or when filled.
const FloatingInput = ({ id, label, type = "text", required = false, autoComplete }) => (
  <div className="relative">
    <input
      id={id}
      name={id}
      type={type}
      required={required}
      autoComplete={autoComplete}
      placeholder=" "
      className="peer w-full h-13.75 px-4.25 bg-primary-white border-2 border-bg-footer focus:border-primary-black outline-none font-jost text-sm text-primary-black duration-200"
    />
    <label
      htmlFor={id}
      className="absolute left-3.25 px-1 top-1/2 -translate-y-1/2 bg-primary-white font-jost text-sm text-secondColor pointer-events-none duration-200 peer-focus:top-0 peer-focus:text-primary-black peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-primary-black"
    >
      {label}
    </label>
  </div>
);

const SUBMIT_BTN =
  "w-full h-15 bg-primary-black text-primary-white font-jost text-sm font-medium uppercase hover:bg-thirdColor duration-300 cursor-pointer";

const LoginRegister = () => {
  const [tab, setTab] = useState("login");
  const navigate = useNavigate();

  // Fake login/register (no backend): both forms just go to My Account
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/my-account");
  };

  const tabClass = (name) =>
    `font-jost text-base font-medium uppercase pb-1 border-b-2 duration-300 cursor-pointer ${
      tab === name
        ? "text-primary-black border-primary-black"
        : "text-secondColor border-transparent hover:text-primary-black"
    }`;

  return (
    <>
      <Helmet>
        <title>Login / Register | Uomo</title>
      </Helmet>

      {/* mt-15 md:mt-20 keeps the content under the fixed header */}
      <section className="mt-15 md:mt-20 pt-10 md:pt-20 pb-16 md:pb-35 min-h-150 md:min-h-200">
        <Container>
          <div className="max-w-125 mx-auto">
            {/* Tabs */}
            <div role="tablist" className="flex justify-center gap-12 md:gap-16 mb-10 md:mb-13">
              <button
                type="button"
                role="tab"
                aria-selected={tab === "login"}
                onClick={() => setTab("login")}
                className={tabClass("login")}
              >
                Login
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "register"}
                onClick={() => setTab("register")}
                className={tabClass("register")}
              >
                Register
              </button>
            </div>

            {tab === "login" ? (
              <form onSubmit={handleSubmit}>
                <FloatingInput
                  id="login-user"
                  label="Username or email address *"
                  required
                  autoComplete="username"
                />
                <div className="mt-7.5">
                  <FloatingInput
                    id="login-password"
                    label="Password *"
                    type="password"
                    required
                    autoComplete="current-password"
                  />
                </div>

                <div className="flex items-center justify-between mt-5">
                  <label className="flex items-center gap-2.5 font-jost text-sm text-secondColor cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-primary-black cursor-pointer" />
                    Remember me
                  </label>
                  {/* Lost password page does not exist yet */}
                  <button
                    type="button"
                    className="font-jost text-sm text-primary-black underline cursor-pointer"
                  >
                    Lost password?
                  </button>
                </div>

                <button type="submit" className={`${SUBMIT_BTN} mt-7.5`}>
                  Log in
                </button>

                <p className="font-jost text-sm text-secondColor text-center mt-6">
                  No account yet?{" "}
                  <button
                    type="button"
                    onClick={() => setTab("register")}
                    className="text-primary-black underline cursor-pointer"
                  >
                    Create Account
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <FloatingInput id="reg-user" label="Username" autoComplete="username" />
                <div className="mt-7.5">
                  <FloatingInput
                    id="reg-email"
                    label="Email address *"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="mt-7.5">
                  <FloatingInput
                    id="reg-password"
                    label="Password *"
                    type="password"
                    required
                    autoComplete="new-password"
                  />
                </div>

                <p className="font-jost text-sm leading-6 text-secondColor mt-5">
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account, and
                  for other purposes described in our privacy policy.
                </p>

                <button type="submit" className={`${SUBMIT_BTN} mt-3.5`}>
                  Register
                </button>
              </form>
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export default LoginRegister;
