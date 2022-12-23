import frappe


@frappe.whitelist()
def get_total():
    total = frappe.db.sql(""" SELECT SUM(property_price) as total FROM `tabProperty`;  """,as_dict = True)[0].total
    return total

@frappe.whitelist()
def get_status():
    status = frappe.db.sql(""" SELECT status, SUM(property_price) as sum 
    FROM `tabProperty` 
    GROUP BY status ORDER BY status ASC; """)

    return status
