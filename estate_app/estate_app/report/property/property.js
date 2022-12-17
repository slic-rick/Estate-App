// Copyright (c) 2022, Abraham Erikson and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Property"] = {
	"filters": [

		{
			"fieldName":"property_name",
			"label":__("Property Name"),
			'fieldtype':"Data",
			// "reqd":1,
			// "width":150
		}, 
		{
			"fieldName":"from_date",
			"label":__("From Date"),
			'fieldtype':"Date",
			"reqd":1,
			"default":dateutil.year_start(),
			// "width":150
		},
		{
			"fieldName":"to_date",
			"label":__("To Date"),
			'fieldtype':"Date",
			"reqd":1,
			// "width":150,
			"default":dateutil.year_end()
		},
		{
			"fieldName":"agent",
			"label":__("agent"),
			'fieldtype':"Link",
			"options":"Agent",
			// "reqd":1,
			// "width":150,
		}

	]
};
