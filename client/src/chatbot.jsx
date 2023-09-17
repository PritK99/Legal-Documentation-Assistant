import React, { useEffect } from 'react'
 
const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
    script.async = true
    document.body.appendChild(script)
 
    script.onload = () => {
      window.botpressWebChat.init({
        botId: '621bf44a-4a78-46e5-a91d-b41d75b878a9',
        hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
        messagingUrl: 'https://messaging.botpress.cloud',
        clientId: '621bf44a-4a78-46e5-a91d-b41d75b878a9',
      })
    }
  }, [])
 
  return <div id="webchat " />
}
 
export default Chatbot