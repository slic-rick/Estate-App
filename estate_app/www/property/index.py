
import frappe

from estate_app.utils import paginate

def get_context(context):
    try:
        page = frappe.form_dict.page

        type = frappe.form_dict.types
        conditions = ""

        print(f"\n\n\n\ The received type is :{type} n\n\n\n")
        if(type):
            conditions = f"""WHERE property_type = '{type}'"""

    
        # context.properties = frappe.db.sql("""SELECT * FROM `tabProperty`;""",as_dict = True)
        pagination = paginate(page=page,doctype='Property',conditions=conditions)

        types = frappe.db.sql("""SELECT name FROM `tabProperty Type`;""",as_dict=True)
        
        context.types = types
        context.properties = pagination.get("properties")
        context.next_page = pagination.get("next_page")
        context.prev = pagination.get("prev")
        context.search = pagination.get("search")
        return context
    except Exception as e:
        frappe.throw("An error occured while getting properties")