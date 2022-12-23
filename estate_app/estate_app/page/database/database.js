// frappe.pages['database'].on_page_load = function(wrapper) {
// 	new MyPage(wrapper)
// }

// MyPage = Class.extend({
// 	init: function(wrapper) {	
	
// 		this.page = frappe.ui.make_app_page({
// 			parent: wrapper,
// 			title: 'Database Access',
// 			single_column: true
// 		});

// 		this.make()
// 	},

// 	make: () => {

// 		let makeQuery = (queryText) => {
// 			frappe.call({
// 				method:"estate_app.estate_app.page.database.database.get_db",
// 				args:{query:queryText},
// 				callback: (r) => {
// 					console.log(r.message);
// 				}
// 			})
// 		}
			
// 		$(frappe.render_template(frappe.database_page.body,this)).appendTo(this.page.main)
// 	}
// })

// var page_body = 
// `<div id="">
// 	<form id="queryForm">
// 	<div class="form-group">
// 		<label for="query">Enter SQL QUERY</label>
// 		<textarea class="form-control" id="query" aria-describedby="query" placeholder="Enter Query"></textarea>
// 		<small id="emailHelp" class="form-text text-muted text-danger">Think before you type.</small>
// 	</div>
// 	<button type="submit" class="btn btn-primary">Submit</button>
// 	</form>
// <br>
// </div>
// 	<div id="queryResult">
//     </div>
// `;

// frappe.database_page = {
// 	body:page_body,
// }


frappe.pages['database'].on_page_load = function(wrapper) {

	// Init the class that receives the DOM = @wrapper
	new MyPage(wrapper)

}

// Create a new class
 MyPage = Class.extend({
	init: function(wrapper) {
		this.page = frappe.ui.make_app_page({
			parent: wrapper,
			title: 'database Console',
			single_column: true
		});

		this.make()
	},
	make: function () {

		$(frappe.render_template(frappe.estate_app_page.body,this)).appendTo(this.page.main)
			// Creating a script for getting the library  =  datatable
			let script = document.createElement('script')
			script.src = "https://unpkg.com/frappe-datatable@latest"

			document.head.appendChild(script)

			function tableHead(data){
				let datatable = new DataTable("#queryResult", {
					columns: data.tableHead,
					data: data.content,
					inlineFilters: true,
					dropdownButton: '▼'
				});
			}


		

		let makeQuery = (query) => {
						
						frappe.call({
							method:"estate_app.estate_app.page.database.database.get_db",
							args:{queryText:query},
							callback: (r) => {
								console.log(r.message);
								data = r.message;
								let res = $("#queryResult")
								if(data.reply == 0){
									frappe.throw(r.content)
									// res[0].innerText = "Not permitted to send queries"
								}else if (data.reply == 2) {
									res[0].innerText = data.content
								}else{
									tableHead(data)
								}
							}
						})
					}

		$("#queryForm").submit( e => {
			console.log("SUBMIT CLICKED");
			e.preventDefault()

			// Gettting the form value from html
			let formValue = $("#query")[0].value

			console.log(formValue);

			if(formValue.length > 0) {
				// If its not empty we send it as a query
				makeQuery(formValue)

			}

		})

	
		

	}

	
 })

// Create the <body></body> 
 let body = `<div id="">
				<form id="queryForm">
					<div class="form-group">
						<label for="query">Enter SQL QUERY</label>
						<textarea class="form-control" id="query" aria-describedby="query" placeholder="Enter Query"></textarea>
						<small id="emailHelp" class="form-text text-muted text-danger">Think before you type.</small>
					</div>
					<button type="submit" class="btn btn-primary">Submit</button>
				</form>
 				<br>
				</div>
			<div id="queryResult">
			</div>
`;
// link the to frappe
frappe.estate_app_page = {
	body: body
}
