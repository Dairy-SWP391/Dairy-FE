import DocumentTitle from "../components/DocumentTitle";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import media from "../assets/login.png";
import Spring, { SpringType } from "../components/Spring";
import google from "../assets/icons/google.svg";
import facebook from "../assets/icons/facebook.svg";
import classNames from "classnames";
import PasswordInput from "../components/PasswordInput";
import useWindowSize from "../hooks/useWindowSize";

const DefaultValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

interface RegisterFormProps {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const Login = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RegisterFormProps>({
    defaultValues: DefaultValues,
  });

  const onSubmit = () => {
    navigate("/");
  };

  // const onReject = (err) => {
  //   toast.error(err);
  // };

  return (
    <>
      <DocumentTitle title="Register" />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 4xl:grid-cols-[minmax(0,_1030px)_minmax(0,_1fr)]">
        {width >= 1024 && (
          <div className="flex flex-col justify-center bg-gradient-to-r from-[#90A5A7] to-[#DBEAF0] items-center lg:p-[60px]">
            {/* <Logo imgClass="w-[60px]" textClass="text-[28px]" /> */}
            {/* <p className="text-center tracking-[0.2px] font-semibold text-lg leading-6 max-w-[540px] my-7 mx-auto">
              Gain data-based insights, view progress at a glance, and manage
              your organization smarter
            </p> */}
            <img className="max-w-[780px]" src={media} alt="media" />
          </div>
        )}
        <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
          <Spring
            className="max-w-[460px] w-full"
            type={SpringType.SLIDE_UP}
            duration={400}
            delay={300}
          >
            <div className="flex flex-col gap-2.5 text-center">
              <h1>Become our member!</h1>
              {/* <p className="lg:max-w-[300px] m-auto 4xl:max-w-[unset]">
                Etiam quis quam urna. Aliquam odio erat, accumsan eu nulla in
              </p> */}
            </div>
            <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-5">
                  <div className="field-wrapper">
                    <label htmlFor="first_name" className="field-label">
                      First name
                    </label>
                    <input
                      className={classNames("field-input", {
                        "field-input--error": errors.first_name,
                      })}
                      id="first_name"
                      type="text"
                      placeholder="Your first name"
                      {...register("first_name", {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="field-wrapper">
                    <label htmlFor="last_name" className="field-label">
                      Last name
                    </label>
                    <input
                      className={classNames("field-input", {
                        "field-input--error": errors.last_name,
                      })}
                      id="last_name"
                      type="text"
                      placeholder="Your last name"
                      {...register("last_name", {
                        required: true,
                      })}
                    />
                  </div>
                </div>
                <div className="field-wrapper">
                  <label htmlFor="email" className="field-label">
                    E-mail
                  </label>
                  <input
                    className={classNames("field-input", {
                      "field-input--error": errors.email,
                    })}
                    id="email"
                    type="text"
                    placeholder="Your E-mail address"
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                  />
                </div>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <PasswordInput
                      id="password"
                      placeholder="Your password"
                      error={errors.password}
                      innerRef={field.ref}
                      isInvalid={errors.password}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col items-center gap-6 mt-10 mb-8">
                <button className="btn btn--primary w-full">Register</button>
              </div>
            </form>
            <div>
              <div className="relative">
                {/* <span className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-border" /> */}
                <span className="flex items-center justify-center relative z-10 w-11 h-[3px] m-auto bg-widget">
                  or
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 xs:gap-[30px] mt-[20px] mb-9">
                {/* <LoginSocialGoogle
                  className="btn btn--social"
                  client_id={import.meta.env.VITE_GOOGLE_APP_ID}
                  onReject={onReject}
                  onResolve={onSubmit}
                >
                  <img className="icon" src={google} alt="Google" />
                  Google
                </LoginSocialGoogle> */}
                <button className="btn btn--social">
                  <img className="icon" src={google.toString()} alt="Google" />
                  Google
                </button>
                <button className="btn btn--social">
                  <img
                    className="icon"
                    src={facebook.toString()}
                    alt="Facebook"
                  />
                  Facebook
                </button>
              </div>
              <div className="flex justify-center gap-2.5 leading-none">
                <p>Already have account?</p>
                <button
                  className="text-btn"
                  onClick={() => (window.location.href = "/login")}
                >
                  Log In
                </button>
              </div>
            </div>
          </Spring>
        </div>
      </div>
    </>
  );
};

export default Login;
