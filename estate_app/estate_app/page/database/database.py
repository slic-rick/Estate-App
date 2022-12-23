import frappe

@frappe.whitelist()
def get_db(queryText):
    data = {'reply':0}
    sql = frappe.db.sql(f""" {queryText} """)

    if frappe.session.user != 'Administrator':
        data['content'] = "Not Permitted! "
        return data

    try:
        get_data = frappe.db.sql(f""" {queryText} """,as_dict = True)

        if get_data:
            data['tableHead'] = [i[1] for i in enumerate(get_data[0])]
            data['content'] = get_data
            data['reply'] = 1

    except Exception as e:
        data['reply'] = 2
        data['content'] = e
    return data
