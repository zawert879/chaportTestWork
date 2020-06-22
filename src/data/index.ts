import raw from './data.json'

export interface IMessage {
  request: IMessageRequest[],
  response: string
}

export interface IMessageRequest {
  text: string
  next?: IMessage
}

const data: IMessage = raw
export default data
