import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const SignupCTA = (props: Props) => {
  return (
    <p className="text-sm font-light text-white">
      Don’t have an account yet?{" "}
      <Link
        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        to={"register"}
      >
        Sign up
      </Link>
    </p>
  );
};

export default SignupCTA;
