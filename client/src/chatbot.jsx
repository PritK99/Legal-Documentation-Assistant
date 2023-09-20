import React, { useEffect } from 'react'
 import './chatbot.css'
const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
    script.async = true
    document.body.appendChild(script)
 
    script.onload = () => {
      window.botpressWebChat.init({
       
      
        "composerPlaceholder": "Ask your legal query",
        "botConversationDescription": "This chatbot was built surprisingly fast with Botpress",
        "botId": "42cc66eb-b6fb-44f8-9d2a-2b732298f460",
        "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
        "messagingUrl": "https://messaging.botpress.cloud",
        "clientId": "42cc66eb-b6fb-44f8-9d2a-2b732298f460",
        "lazySocket": true,
        "botName": "LegalAdvisor",
        "stylesheet": "https://webchat-styler-css.botpress.app/prod/e445f64c-9988-4529-b187-ac0c105ee60f/v69236/style.css",
        "frontendVersion": "v1",
        "showPoweredBy": true
        
      })
    }
  }, [])
 
  return (

  <>
  <div className='pb-1'>
  
  <div id="webchat" />
  </div>
    
  </>
  )
}
 
export default Chatbot