
import frappe

from estate_app.utils import paginate

def get_context(context):
    try:
        page = frappe.form_dict.page
    
        # context.properties = frappe.db.sql("""SELECT * FROM `tabProperty`;""",as_dict = True)
        pagination = paginate(page=page,doctype='Property')

        print(f"\n\n\n\n {pagination} \n\n\n\n\n\n\n")

        context.properties = pagination.get("properties")
        context.next_page = pagination.get("next_page")
        context.prev = pagination.get("prev")
        return context
    except Exception as e:
        frappe.throw("An error occured while getting properties")