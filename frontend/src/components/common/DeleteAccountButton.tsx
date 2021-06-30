import * as React from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { FiDelete, FiTrash } from "react-icons/fi";
import { useToasts } from "react-toast-notifications";
import { useClient } from "../../hooks/client";

export const DeleteAccountButton: React.VFC<{}> = () => {

  const [showModal, setShowModal] = useState(false);
  const client = useClient()
  const toasts = useToasts()

  const onDelete = async () => {
    setShowModal(false)
    client.deleteUser().then((result) => {
      if (result.success) {
        toasts.addToast("アカウントが削除されました", {
          appearance: "success",
          autoDismiss: true,
        });
        window.location.reload();
      } else {
        toasts.addToast("アカウントの削除に失敗しました", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    })
  }

  return (
    <>

      <button className="h-8 px-4 m-2 text-sm text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800"
        onClick={() => {
          setShowModal(true)
        }}
      >
        アカウント削除 <FiTrash className="inline" />
      </button>

      {
        showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-black text-3xl font-semibold">
                      アカウント削除
                    </h3>
                    <button
                      className="text-black p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <p className="text-black my-4 text-lg leading-relaxed">
                      登録した情報が全て削除されます。
                      アカウントを削除しますか？
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-black font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      キャンセル
                    </button>
                    <button
                      className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => { onDelete() }}
                    >
                      削除
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
    </>
  )
}