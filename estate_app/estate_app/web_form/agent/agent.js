frappe.ready(function() {
	// frappe.msgprint('READY')
	// after the page finishes loading
	// frappe.web_form.after_load = () => {

		// frappe.msgprint("WORKIN the work")

		// Method for validating the form
		frappe.web_form.validate = () => {
			frappe.msgprint('Validate is working')

			email = frappe.web_form.get_value('email');
			if(!email.includes('@')){
				frappe.throw(__('Please insert a valid email'))
				return false;
			}
			return true

	}


// frappe.web_form.after_load = () => {
//     frappe.msgprint('Please fill all values carefully');
// }


});