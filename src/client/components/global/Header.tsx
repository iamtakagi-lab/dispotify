import { Head } from 'next/document'
import * as React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { UsersCount } from '../../../typings/struct'
import { useClient } from '../../hooks/client'
import ThemeSwitch from '../widgets/ThemeSwitch'

export const Header: React.VFC<{}> = () => {
  const client = useClient()
  const [usersCount, setUsersCount] = useState<UsersCount | null>()

  useEffect(() => {
    client.getUsersCount().then((data) => {
      setUsersCount(data)
    })
  }, [])

  return (
    <header className="flex">
      <div className="desc w-full my-6 space-y-1">
        <a href="" className="text-xl">
          Dispotify
        </a>
        <p className="text-sm">
          Spotify to Discord notifier / Spotifyで再生中の音楽をDiscordに通知
        </p>
        <p className="text-sm">
          現在{usersCount ? usersCount.count : 0}人のユーザーが利用しています
        </p>
      </div>

      <div className="mt-5">
        <ThemeSwitch />
      </div>
    </header>
  )
}
