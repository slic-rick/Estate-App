document.querySelector("#contact-agent").addEventListener('click',(e) => {
   var doc_name =  document.querySelector("#doc_name").textContent;
    var email = document.querySelector("#email").value;

 console.log(doc_name);
 console.log(email);

    let d = new frappe.ui.Dialog({
        title: 'Contact Details',
        fields: [
            {
                label: 'Full Name',
                fieldname: 'full_name',
                fieldtype: 'Data'
            },
            {
                label: 'Email',
                fieldname: 'email',
                fieldtype: 'Data'
            },
            {
                label: 'Message',
                fieldname: 'message',
                fieldtype: 'Small Text'
            }
        ],
        primary_action_label: 'Submit',
        primary_action(values) {
            values.name = doc_name;
            values.agentMail = email;
            console.log(values);
            frappe.call({
                method: "estate_app.estate_app.api.contact_agent",
                args: values,
                // always: function(r) {},
                // btn: opts.btn,
                // freeze: false,
                // freeze_message: "",
                // async: true,
                // url: "" || frappe.request.url,
                callback: (r) => {
                    console.log(r);
                }
            });
            
            
            // console.log(values);
            d.hide();
        }
    });
    
    d.show();
  
  })