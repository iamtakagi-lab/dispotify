import { Head } from "next/document";
import * as React from "react";
import ThemeSwitch from "../widgets/ThemeSwitch";

export const Header: React.VFC<{}> = () => {
  return (
    <header className="flex">

      <div className="desc w-full my-6 space-y-1">
        <a href="" className="text-xl">Dispotify</a>
        <p className="text-sm">Spotify to Discord notifier / Spotifyで再生中の音楽をDiscordに通知</p>
      </div>

      <div className="mt-5">
        <ThemeSwitch />
      </div>

    </header>
  );
};
