// import React from "react";
// const Contacts=()=>{
//     return <div>
//                 <div><a href='mailto:sathyashivareddy9@gmail.com'><i class="fa-solid fa-envelope"></i>Mail me</a></div>
//                 <div></div>
//     </div>
// }
// export default Contacts;
import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import the Font Awesome CSS
import './Contacts'
const Contacts = () => {
  return (
    <div>
      <div>
        {/* Use an <a> tag with a class */}
        <a href='mailto:sathyashivareddy9@gmail.com' className="contact-link">
          {/* Use an <i> tag for the mail icon */}
          <i className="fa-solid fa-envelope"></i>
          sathyashivareddy9@gmail.com
        </a>
      </div>
      <div className="phone-number">
      <i class="fa-solid fa-phone"></i>
        9390659265
      </div>
      <div></div>
    </div>
  );
}
//CSS FILE FOR THIS
/*
/* Contacts.css */
// .contact-link {
//     text-decoration: none; /* Remove underlining */
//     display: flex; /* Display contents in a row */
//     align-items: center; /* Center contents vertically */
//     color: #000; /* Change the link color to black (you can choose your desired color) */
//   }
  
//   /* Style the mail icon */
//   .contact-link i {
//     margin-right: 5px; /* Add some spacing between the icon and text */
//     font-size: 16px; /* Adjust the icon size as needed */
//   }
  
// */
export default Contacts;
// import React from "react";

// const linkStyle = {
//   textDecoration: "none", // Remove underlining
//   display: "flex", // Display contents in a row
//   alignItems: "center", // Center contents vertically
//   color: "#000", // Change the link color to black (you can choose your desired color)
// };

// const iconStyle = {
//   marginRight: "5px", // Add some spacing between the icon and text
//   fontSize: "16px", // Adjust the icon size as needed
// };

// const Contacts = () => {
//   return (
//     <div>
//       <div>
//         <a href='mailto:sathyashivareddy9@gmail.com' style={linkStyle}>
//           <i className="fa-solid fa-envelope" style={iconStyle}></i>
//           Mail me
//         </a>
//       </div>
//       <div></div>
//     </div>
//   );
// }

// export default Contacts;
