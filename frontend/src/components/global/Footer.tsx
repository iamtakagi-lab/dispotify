import * as React from "react";
import { FiGithub } from "react-icons/fi";

export const Footer: React.VFC<{}> = () => {
  return (
    <footer className="desc w-full my-6 space-y-1 mt-7">
      <a
        className="text-sm underline"
        href="https://github.com/iamtakagi/dispotify"
      >
        View code of this page
        <FiGithub className="inline block ml-1" />
      </a>
    </footer>
  );
};
