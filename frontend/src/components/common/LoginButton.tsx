import * as React from "react";
import { FiLogIn } from "react-icons/fi";

export const LoginButton: React.VFC<{}> = () => {

    return (
      <div>
  
      <button className="h-8 px-4 m-2 text-sm text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800"
        onClick={async () => {
          window.open('http://localhost:3001/api/auth/login', '_self')
          }}
        >
          Spotifyでログイン <FiLogIn className="inline"/>
        </button>

      </div>
    )
}