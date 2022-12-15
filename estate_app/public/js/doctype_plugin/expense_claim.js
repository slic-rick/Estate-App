frappe.ui.form.on('Expense Claim', {
	// refresh(frm) {
		
		
		
		
	// }
});

frappe.ui.form.on('Expense Claim Detail', {
	refresh(frm) {
		
		
	},
 expenses_add(frm,cdt,cdn){
		    
		 let row = locals[cdt][cdn]
		    console.log(row)
		    
		    if(frm.doc.posting_date){
		        
		        row.expense_date = frm.doc.posting_date
		        frm.refresh_field("expenses")
		    }
		}
});