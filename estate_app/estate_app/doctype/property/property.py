# Copyright (c) 2022, Abraham Erikson and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Property(Document):
	
	def validate(self):
		# if self.property_type == "Flat":
		# 	for amenity in self.amenities:
		# 		print("The amenity is")
		# 		print(f"\n\n\n ${amenity.amenity} \n\n")
		# 		if amenity.amenity == 'Outdoor Garage':
		# 			frappe.throw(f'A Flat can not have a ${amenity.amenity}')


		# if self.property_type == "Flat":
		# 	amenities = frappe.db.sql(f""" select amenity from `tabProperty Amenity Detail` WHERE parent = {self.name} AND amenity = "Outdoor Garage";""",as_dict=True)
		# 	print(f"\n\n\n\n {amenities} \n\n\n")
		# 	print("\n\n\n\n ------Amenities---- \n\n\n\n")
		# 	if amenities:
		# 		frappe.throw(f'A Flat Can not have an outdoor garage')
