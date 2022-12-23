import frappe
# from bitcoin_value import currency
def sendmail(doc,recipients,msg,title,attachments=None):
    email_args = {
        'recipients':recipients,
        'message':msg,
        'subject':title,
        'reference_doctype': doc.doctype,
        'reference_name':doc.name,
    }

    if attachments:email_args['attachments'] = attachments

    frappe.enqueue(method=frappe.sendmail,queue='short',timeout=300,**email_args)

def paginate(doctype,page=0,paginate_by=6, conditions = ""):
    
    query = f""" SELECT * FROM `tab{doctype}` {conditions}  ORDER BY creation DESC """
    search = False
    


    if(page):
        page = int(page)
        properties = frappe.db.sql(query + f"""LIMIT {(paginate_by * page) - paginate_by},{paginate_by};""",as_dict = True)
        next_prop =  frappe.db.sql(query + f"""LIMIT {(paginate_by * page)},{paginate_by};""",as_dict = True)

        if(next_prop):
            next_page,prev = page + 1,page - 1
        else:
            next_page,prev = 0,page - 1
    else:
        count = frappe.db.sql(f""" SELECT COUNT(name) as count FROM `tab{doctype}`;""",as_dict = True)[0].count

        if(count > paginate_by):
            prev,next_page = 0,2
        else:
            pass

        properties = frappe.db.sql(query + f""" LIMIT {paginate_by};""",as_dict = True)

    
    if(conditions):
        search = True

    return {
        "properties": properties,
        "next_page":  next_page,
        "prev":prev,
        "search":search
    }

def property_to_btc(price):
    return float(price) * 2