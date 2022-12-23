import frappe

def get_context(context):
    try:
        # Received data from webhook
        context.data = frappe.form_dict
        print(f"\n\n\n\n {context.data} \n\n\n")
        return context
    except Exception as e:
        frappe.locals.flags.redirect_location = "/404"
        raise frappe.Redirection