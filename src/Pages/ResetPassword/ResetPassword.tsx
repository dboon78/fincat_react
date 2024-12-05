import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Context/useAuth";
import { useForm } from "react-hook-form";
import React from "react";
import { useSearchParams } from "react-router-dom";
import SignupCTA from "../../Components/SignupCTA/SignupCTA";

type Props = {};

type ResetFormInputs = {
  email: string;
  token: string;
  newPassword: string;
  passwordConfirmation: string;
};

const validation = Yup.object().shape({
  email: Yup.string().required("Useremailname is required"),
  token: Yup.string().required("No token detected"),
  newPassword: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});
const ResetPassword = (props: Props) => {
  const { resetPassword } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormInputs>({ resolver: yupResolver(validation) });
  const resetSubmit = (form: ResetFormInputs) => {
    console.log("resetSubmit");
    resetPassword(form.email, form.token, form.newPassword);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mb-20 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Enter your new password.
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(resetSubmit)}
            >
              <input
                type="hidden"
                value={searchParams.get("token")!}
                {...register("token")}
              />
              <div>
                <label
                  htmlFor="userName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  value={decodeURI(searchParams.get("email")!)}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email ? (
                  <p className="text-white">{errors.email.message}</p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="text"
                  id="newPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("newPassword")}
                />
                {errors.newPassword ? (
                  <p className="text-white">{errors.newPassword.message}</p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label
                  htmlFor="passwordConfirmation"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="text"
                  id="passwordConfirmation"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("passwordConfirmation")}
                />
                {errors.passwordConfirmation ? (
                  <p className="text-white">
                    {errors.passwordConfirmation.message}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 bg-lightGreen hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Submit
              </button>
              <SignupCTA />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
