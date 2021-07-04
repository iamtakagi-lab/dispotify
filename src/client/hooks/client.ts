import { Client } from '../infra/Client'

export const useClient = () => {
  return new Client()
}
