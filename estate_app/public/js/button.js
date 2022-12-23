//  document.addEventListener("DOMContentLoaded",(e) => {
//     console.log("DOC loaded ------------------------");

//     let nav = document.querySelector(".navbar-collapse")
//     var anc = document.createElement('a')
//     anc.href = "https://cloud.yandex.com/en/services/translate"
//     anc.innerText = "Click here"
//     nav.prepend(anc)

//    // document.head.appendChild()
// //  console.log(logo);
// //    logo.src = "/assets/frappe/images/frappe-favicon.svg"

//  })

//dom ready
document.addEventListener("DOMContentLoaded", (event)=>{
    console.log("LOADED");
  // navbar and anchor element
  let navbar = document.querySelector(".navbar-collapse");
  console.log(navbar);
  let anc = document.createElement('a');
  anc.id="ytWidget";
  navbar.prepend(anc);
  // script tag
//   let scrtag = document.createElement('script');
//   scrtag.src = "https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=en&widgetTheme=dark&autoMode=true"
//   scrtag.type = "text/javascript";
//   // append script tage to page
//   document.head.appendChild(scrtag);

})