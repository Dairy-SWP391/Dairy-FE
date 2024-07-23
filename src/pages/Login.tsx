import DocumentTitle from "../components/DocumentTitle";
import { Controller, useForm } from "react-hook-form";
import media from "../assets/login.png";
import Spring, { SpringType } from "../components/Spring";
import google from "../assets/icons/google.svg";
import facebook from "../assets/icons/facebook.svg";
import classNames from "classnames";
import PasswordInput from "../components/PasswordInput";
import { MouseEvent } from "react";
import useWindowSize from "../hooks/useWindowSize";
import { getMe, login } from "../apis/user";
import { toast } from "react-toastify";
import { ResponseApi, isAxiosUnprocessableEntityError } from "../utils/utils";
import { useAuth } from "../provider/AuthProvider";

const Login = () => {
  const { width } = useWindowSize();
  const { addToken } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    criteriaMode: "all"
  });

  const onSubmit = async (_data: { email: string; password: string }) => {
    try {
      const result = await login(_data);
      if (result.status === 200) {
        addToken(result.data.result);
        toast.success("Login successful");
        const user_info = await getMe();
        if (user_info.status === 200) {
          if (user_info.data.result.role === "MEMBER") {
            setTimeout(() => (window.location.href = "/"), 2000);
          } else {
            setTimeout(() => (window.location.href = "/admin"), 2000);
          }
        }
        // const ahihi = jwtDecode<{ role: "MEMBER" | "STAFF" | "ADMIN" }>(
        //   result.data.result.access_token
        // );
        // console.log(ahihi);
        // if (role === "MEMBER") navigate("/");
        // navigate("/admin");
        // window.location.href = "/";
      }
    } catch (err) {
      if (
        isAxiosUnprocessableEntityError<
          ResponseApi<{ email: string; password: string }>
        >(err)
      ) {
        // const formError = err.response?.data.data;
        toast.error("Email/Phone number or Password is incorrect");
        // if (formError) {
        //   Object.keys(formError).forEach((key) => {
        //     setError(key as keyof LoginFormData, {
        //       message: formError[key as keyof LoginFormData],
        //       type: "Server",
        //     });
        //   });
        // }
      }
    }
  };

  // const onReject = (err) => {
  //   toast.error(err);
  // };

  const handlePasswordReminder = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleLoginGG = () => {
    const getGoogleAuthUrl = () => {
      const url = "https://accounts.google.com/o/oauth2/v2/auth";
      const query = {
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
        response_type: "code",
        scope: [
          "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/userinfo.profile"
        ].join(" "),
        prompt: "consent",
        access_type: "offline"
      };
      return `${url}?${new URLSearchParams(query)}`;
    };
    const googleAuthUrl = getGoogleAuthUrl();
    window.location.href = googleAuthUrl;
  };

  return (
    <>
      <DocumentTitle title="Login" />
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
              <h1>Welcome back!</h1>
              {/* <p className="lg:max-w-[300px] m-auto 4xl:max-w-[unset]">
                Etiam quis quam urna. Aliquam odio erat, accumsan eu nulla in
              </p> */}
            </div>
            <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5">
                <div className="field-wrapper">
                  <label htmlFor="email" className="field-label">
                    E-mail
                  </label>
                  <input
                    className={classNames("field-input", {
                      "field-input--error": errors.email
                    })}
                    id="email"
                    type="text"
                    placeholder="Your E-mail address"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "This field is required"
                      },
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email format"
                      }
                    })}
                  />
                  <p className="text-red-500 text-sm ml-3">
                    {errors.email?.message}
                  </p>
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
              <div className="flex flex-col items-center gap-6 mt-4 mb-10">
                <button className="text-btn" onClick={handlePasswordReminder}>
                  Forgot Password?
                </button>
                <button className="btn btn--primary w-full">Log In</button>
              </div>
            </form>
            <div>
              <div className="relative">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-border" />
                <span className="flex items-center justify-center relative z-10 w-11 h-[23px] m-auto bg-widget">
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
                <button className="btn btn--social" onClick={handleLoginGG}>
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
                <p>Don’t have an account?</p>
                <button
                  className="text-btn"
                  onClick={() => (window.location.href = "/register")}
                >
                  Sign Up
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
