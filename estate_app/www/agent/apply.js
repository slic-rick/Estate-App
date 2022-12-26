// $('#agent-form').submit( (e) => {
//     e.preventDefault();
//     makeCall();
//   })


//    var makeCall = async () => {
//         data = $('#agent-form').serializeArray().reduce(
//             (obj, item)=>(obj[item.name]=item.value, obj), {}
//         )

//        let imageData = $('#image')[0].files[0]
//         let fileData = new FormData()

//         if(imageData){
//             fileData.append('file',imageData)
//         }

//         // Send data to API

//         if(data){

//             let res = await $.ajax({
//                 headers:{
//                     'Content-Type': 'application/json',
//                     'X-Frappe-CSRF-Token': frappe.csrf_token 
//                 },
//                 url:'/api/resource/Agent',
//                 type:'POST',
//                 data:JSON.stringify(data),
//                 success: (data) => {return data},
//                 error: (data) => {return data}
//             })

//             console.log(res);

//             if(res.data && imageData){
//                 // upload file
//                 upload = fetch('/api/method/upload_file',{
//                     method:'POST',
//                     body:imageData,
//                     headers:{
//                         'X-Frappe-CSRF-Token': frappe.csrf_token
//                     }
//                 }).then( res => res.json()).then( async (data) => {
//                     if(data.message){
//                         // Then we upadate the doc
//                        send =  await $.ajax({
//                             headers:{
//                                 'X-Frappe-CSRF-Token': frappe.csrf_token 
//                             },
//                             url:`/api/resource/Agent/${res.data.name}`,
//                             type:'PUT',
//                             data:JSON.stringify({image:data.message.file_url}),
//                             success: (data) => {return data},
//                             error: (data) => {return data}
//                         })

//                     }

//                 })
//             }

//         }

//   }




$('#agent-form').submit(e=>{
  e.preventDefault();
  // upload method
  makecall();
})

// upload method
let makecall = async()=>{
  let formdata = $('#agent-form').serializeArray().reduce(
      (obj, item)=>(obj[item.name]=item.value, obj), {}
  );
  let imagedata = $('#image')[0].files[0];
  // initialize form
  let imagefile = new FormData()
  if(imagedata){
      imagefile.append('file', imagedata);
  }
  // end initialize

  // post to API
  if(formdata){
      let res = await $.ajax({
          url: '/api/resource/Agent',
          type: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-Frappe-CSRF-Token': frappe.csrf_token
          },
          data: JSON.stringify(formdata),
          success: function(data){
              return data
          },
          error: function(data){
              return data
          }
      })
      console.log(res);
      // upload image
      if(res.data && imagedata){
          let imgres = await fetch('/api/method/upload_file', {
              headers: {
                  'X-Frappe-CSRF-Token': frappe.csrf_token
              },
              method: 'POST',
              body: imagefile
          })
          .then(res=>res.json())
          .then(data=>{
              console.log(data);
              // finally update document
              if(data.message){
                  // update agent
                  $.ajax({
                      url: `/api/resource/Agent/${res.data.name}`,
                      type: 'PUT',
                      headers: {
                          'Content-Type': 'application/json',
                          'X-Frappe-CSRF-Token': frappe.csrf_token
                      },
                      data: JSON.stringify({image:data.message.file_url}),
                      success: function(data){
                          return data
                      },
                      error: function(data){
                          return data
                      }
                  })

                  // end update agent
              }
          })
      }
  }

}