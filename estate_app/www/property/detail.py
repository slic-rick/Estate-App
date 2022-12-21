
import frappe

def get_context(context):
    try:
        context.property = frappe.get_doc('Property',frappe.form_dict.docname)
        context.agent = frappe.get_doc("Agent",context.property.agent)
        # Getting the related properties on the detail page
        context.relatedProperties = frappe.db.sql(f"""SELECT * FROM `tabProperty` WHERE property_type = '{context.property.property_type}' ORDER BY creation DESC LIMIT 3;""",as_dict=True)
        return context
    except Exception as e:
        frappe.locals.flags.redirect_location = "/404"
        raise frappe.Redirection