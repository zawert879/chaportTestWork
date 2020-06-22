import { IMessage, IMessageRequest } from './data'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

class Bot {
  private _startMessage!: IMessage

  private _prepareMessage (message: IMessage): string {
    let result = `Bot Message: ${message.response}\n`
    message.request.forEach((value, index) => {
      result += `${index} - ${value.text}\n`
    })
    result += `User input: `
    return result
  }

  private _goMessage (message: IMessage) {
    const prepareMessage = this._prepareMessage(message)
    rl.question(prepareMessage, (answer) => {
      const answerInt = Number(answer)
      const request = message.request[answerInt]
      if (request !== undefined) {
        if (request.next !== undefined) {
          this._goMessage(request.next)
        } else {
          console.log('THE END')
          this._goMessage(this._startMessage)
        }
      } else {
        console.log('No such option\n')
        this._goMessage(message)
      }
    })

  }

  public start (startMessage: IMessage) {
    this._startMessage = startMessage
    this._goMessage(startMessage)
  }
}

export default new Bot()
