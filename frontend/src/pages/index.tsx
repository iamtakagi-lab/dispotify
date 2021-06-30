import React, { useEffect, useState } from "react";
import { LoginButton } from "../components/common/LoginButton";
import { useCookies } from "react-cookie";
import { useClient } from "../hooks/client";
import { LogoutButton } from "../components/common/LogoutButton";
import { Client } from "../client/Client";
import { useToasts } from "react-toast-notifications";
import { Me } from "../typings/struct";
import { DeleteAccountButton } from "../components/common/DeleteAccountButton";
import { FiSave } from "react-icons/fi";

const IndexPage: React.VFC<{}> = () => {

  const [cookies] = useCookies(['accessToken'])
  const [me, setMe] = useState<Me>()
  const [webhookUrls, setWebhookUrls] = useState("")
  const [messageFormat, setMessageFormat] = useState("")

  const toasts = useToasts()

  let client: Client

  if (cookies['accessToken']) {

    client = useClient()
    useEffect(() => {
      client.getMe().then((data: Me) => {
        setMe(data)
        const user = data.user
        if(!user) return
        setMessageFormat(user.messageFormat)
        let urls = ""
        for (let i = 0; i < user.webhookUrls.length; i++) {
          const url = user.webhookUrls[i]
          urls += url
          if (user.webhookUrls[i + 1]) {
            urls += ","
          }
        }
        setWebhookUrls(urls)
      })
    }, [])

    /**
    useEffect(() => {
      const interval = setInterval(() => {
      client.getPlaying().then((data: any) => {
          setPlaying(data)
        })
      }, 1000)
      return () => clearInterval(interval);
    }, [])
    <p className="text-md mb-5">NowPlaying: {playing ? playing.item.name : ''} {format(Number(playing.progress_ms), 'mm:ss') + ' / ' + format(Number(playing.item.duration_ms), 'mm:ss') } </p>
    */


    return (
      <>
        {
          me ? (
            <>

              <p className="text-md inline pl-2">

                <a className="border border-green-500 rounded-full shadow-sm p-3 hover:bg-grey" href={`https://open.spotify.com/user/${me.spotifyUser.id}`}>
                  <img className="rounded-full inline mr-2" width="32px" src={me.spotifyUser.images[0].url} alt="" />
                  {me.spotifyUser.display_name || me.spotifyUser.id}</a> としてログインしています</p>
            </>
          ) : null
        }

        <LogoutButton />
        <DeleteAccountButton />

        <div className="mt-10">
          <p className="text-md">Discord Webhook URL を入力してください (複数の場合は , で区切る)</p>
          <p className="text-sm text-gray-500">e.g. https://discord.com/api/webhooks/xxx/xxx,https://discord.com/api/webhooks/xxx/xxx</p>

          <textarea
            className="form-input mt-1 block w-full border-solid border-2 rounded-md resize-none"
            value={webhookUrls}
            onChange={(event) => setWebhookUrls(event.target.value)}
          />

        </div>

        <div className="mt-5">
          <p className="text-md">メッセージフォーマットを入力してください</p>
          <p className="text-sm text-gray-500">e.g. %name% is playing %track_url%</p>

          <input
            className="form-input mt-1 block w-full border-solid border-2 rounded-md"
            value={messageFormat}
            onChange={(event) => setMessageFormat(event.target.value)}
          />

        </div>

        <button className="h-8 px-4 m-2 text-sm text-blue-100 transition-colors duration-150 bg-blue-700 rounded-lg focus:shadow-outline hover:bg-blue-800"
          onClick={async () => {
            client.updateUser(webhookUrls, messageFormat).then((data) => {
              toasts.addToast("保存しました", {
                appearance: "success",
                autoDismiss: true,
              });
            }).catch((e: any) => {
              toasts.addToast("エラー: " + e, {
                appearance: "error",
                autoDismiss: true,
              });
            })
          }
          }
        >
          保存 <FiSave className="inline" />

        </button>
      </>
    )
  }


  return <LoginButton />
};

export default IndexPage;
