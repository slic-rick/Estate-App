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

					if(r.message.length > 0){

						var header = "<h3> Properties from DB API </h3>";
						var body = ``;

						r.message.forEach( item => {
						
                         var count = `<p> Name: ${item.property_type} <a href= "/${item.name}"> open link </a>`; 
							body = body + count;
						});

						var all = header + body;
						frappe.msgprint(__(all));
						

					}
					// console.log(r);
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

		frm.calculate_total = (frm) => {


			

				var total = 0;
				frm.doc.amenities.forEach(item => {
					
					total = total + item.amenity_amount; 
					
				});

				console.log(`The final total from the loop: ${total}`);

				var finalAmount = frm.doc.property_price + total;
				if(frm.doc.discount){

					finalAmount = finalAmount - (finalAmount  * (frm.doc.discount / 100))
				}

				

				console.log(`FINAL COMPUTED PRICE ${finalAmount}`);

				frm.set_value("total_price",finalAmount)
				frm.refresh_field("total_price")
			
			
		},

		frm.copy_amenities = (frm) => {
			console.log("IN copy amenities");
			frm.doc.amenities.forEach(item => {
				console.log(item);
				item.discount = frm.doc.discount
			});

			frm.refresh_field('amenities');
		}
	},


	property_price: (frm) => {
		frm.calculate_total(frm)
		
	},

	discount: (frm) => {
		frm.copy_amenities(frm)
		frm.calculate_total(frm);
		
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
		frm.calculate_total(frm)
	},
	
	// Called when we delete a row
	amenities_remove:  (frm,cdt,cdn) => {
		frm.calculate_total(frm);
	}
});