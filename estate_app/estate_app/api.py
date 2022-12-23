import frappe

from estate_app.utils import sendmail

@frappe.whitelist()
def contact_agent(**args):
    print(f"\n\n\n {args} \n\n\n\n")
    prop = frappe.get_doc("Property",args.get("name"))
    print(f"\n\n\n\n THE NAME IS -------------- {args.get('name')}  --------------------------------\n\n\n\n")
    email = args.get("email")
    agentEmail = args.get("agentMail")
    msg = f'From:{email} <br> Name: {args.get("full_name")} <br> Message: {args.get("message")}  '
 
    # doc,recipients,msg,title,attachments=None
    sendmail(prop,[agentEmail],msg,"An email from the website")
    return "Message sent successfully"
@frappe.whitelist()
def get_amenities(property):
    data = frappe.db.sql(f"""SELECT * FROM `tabProperty Amenity Detail` WHERE parent = {property};
     """,as_dict = True)
    return data
