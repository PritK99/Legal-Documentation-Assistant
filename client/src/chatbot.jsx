import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

const IconWithScript = () => {
//   useEffect(() => {
//     // Create a script element for the first script tag
//     const script1 = document.createElement("script");
//     script1.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
//     script1.async = true;

//     // Create a script element for the second script tag
//     const script2 = document.createElement("script");
//     script2.src =   "https://mediafiles.botpress.cloud/621bf44a-4a78-46e5-a91d-b41d75b878a9/webchat/config.js";
//     script2.defer = true;

//     // Append the script elements to the document's head
//     document.body.appendChild(script1);
//     document.body.appendChild(script2);

//     // Cleanup function to remove the script elements when the component is unmounted
//     return () => {
//       document.body.removeChild(script1);
//       document.body.removeChild(script2);
//     };
//   }, []);

  // Rest of your component code...
  const handleClick = () => {
    // Your custom JavaScript code goes here
    alert("Icon clicked! You can add your script logic here.");
  };

  return (
    <div>
   <Helmet>
   <script src="https://cdn.botpress.cloud/webchat/v1/inject.js"></script>
<script src="https://mediafiles.botpress.cloud/621bf44a-4a78-46e5-a91d-b41d75b878a9/webchat/config.js" defer></script>
   </Helmet>
    </div>
  );
};

export default IconWithScript;
