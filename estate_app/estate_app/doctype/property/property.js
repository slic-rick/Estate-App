// Copyright (c) 2022, Abraham Erikson and contributors
// For license information, please see license.txt

frappe.ui.form.on('Property', {
	refresh: function(frm) {
		frm.add_custom_button("Get Prop Type",() => {
			var type = frm.doc.property_type;
			frappe.call({
				method: 'estate_app.estate_app.doctype.property.api.get_property_type',
				args:{property_type: type},
				callback: (r) => {
					console.log(r);
				}
			})


		},"Action")
		frm.add_custom_button("Get One",() => {

			frappe.msgprint("Get One");
		},"Action")
	},

	setup: (frm) => {

		// How to attach custom functions to the frm obj
		frm.check_duplicate_amenity = (frm,row) => {
			console.log("THE RECEOVED ROW IS --------------------");

			frm.doc.amenities.forEach(item => {


				if(item.amenity == '' || row.idx == item.idx){

					// if the row is empty or row is already in the table? pass
				}else{

					if(item.amenity == row.amenity){
						row.amenity = '';
						frm.refresh_field("amenities")
						frappe.throw(`The ${item.amenity} is already defined at row ${item.idx} `)
						
					}
				}
			});

			console.log(row);
		}

		frm.check_outdoor_garage = (row) => {

			if(frm.doc.property_type == 'Flat'){
				if(row.amenity == "Outdoor Garage"){
					row.amenity = '';
					frm.refresh_field("amenities")
					frappe.throw("A Flat can not have an Outdoor garage! ")

				}
			}
			
		}
	}


});

// For listening to a table in a doctype
frappe.ui.form.on("Property Amenity Detail", {
	
	// Form,child document Type,child doc name
	amenity: (frm,cdt,cdn) => {
		console.log("AMenities event working :::::::::::::::::::::");
		var row = locals[cdt][cdn];
		// Pasing the changed table row to the function that is accessed in another doctype
		frm.check_duplicate_amenity(frm,row);
		frm.check_outdoor_garage(row);
	}
});