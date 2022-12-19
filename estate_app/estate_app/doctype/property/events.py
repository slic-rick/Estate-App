import frappe
from estate_app.utils import sendmail

def validate(doc,event):
    # 
    # try:
    #     frappe.db.get(""" SELECT * FROM home;""")
    # except Exception as e:
    #     error =  frappe.log_error(frappe.get_traceback(),f"{e}")
    #     frappe.msgprint("AN error had occured {error.name}")
    frappe.msgprint("The validate hook is working ")

def on_update(doc,event):
    frappe.msgprint(f'{doc.name} has been updated')

def after_insert(doc,event):
    note = frappe.get_doc({
        "doctype":"Note",
        "title":f'New doc {doc.name}',
        "public": True,
        "content":f'{doc.owner} created a property: {doc.name}'
    })

    note.insert()
    frappe.db.commit()
    frappe.msgprint("New Note has been created!")
    # Send email after a new doc has been created!

    agent = frappe.get_doc("Agent",doc.agent)
    agent_email = agent.email

    #doc,recipients,msg,title,attachments=None
    message = f'A new doc has been created: {doc.name}'
    attachments = [frappe.attach_print(doc.doctype,doc.name,file_name=doc.name),]
    sendmail(doc,[agent_email],message,"New property",attachments)


