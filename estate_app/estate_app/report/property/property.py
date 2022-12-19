# Copyright (c) 2022, Abraham Erikson and contributors
# For license information, please see license.txt

import frappe


def execute(filters):
	return get_columns(), get_data(filters)


def get_columns():
	# property_name,agent_name,property_price,total_price
	return[
		"ID:Link/Property:150",
		# "Property Name:Data:100",
		# "Type:Data:100",
		"Agent:Data:100",
		"property_price:Currency:100",
		"Total Price:Currency:100"
	]


def get_data(filters):

	# Getting Data from the filters
	from_date,to_date = filters.get('from_date'),filters.get('to_date')

	print(f"\n\n\n\n\n FROM DATE  = {from_date}{to_date} \n\n\n\n\n")

	conditions = "AND 1=1"

	if (filters.get("property_name")):conditions += f" AND property_name LIKE `{filters.get('property_name')}`"
	if (filters.get("agent")):conditions += f" AND agent = {filters.get('property_name')}"

	query = f"SELECT name,agent_name,property_price,total_price FROM `tabProperty`;"
	print("---------------------------------------")
	print(f"\n\n\n\n {query} \n\n\n\n")
	data = frappe.db.sql(f"""{query}""")
 


	return data
