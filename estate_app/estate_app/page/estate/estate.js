frappe.pages['estate'].on_page_load = function(wrapper) {

	// Init the class that receives the DOM = @wrapper
	new MyPage(wrapper)

}

// Create a new class
 MyPage = Class.extend({
	init: function(wrapper) {
		this.page = frappe.ui.make_app_page({
			parent: wrapper,
			title: 'Estate App',
			single_column: true
		});

		this.make()
	},
	make: function () {

		let format = (currency) => {
			var money = new Intl.NumberFormat("en",{style:"currency",currency:"NAD"}).format(currency)
			return money
		}
		
		// Get the total price from db,accessing the API here
		let total = frappe.call({
			method:"estate_app.estate_app.page.estate.estate.get_total",
			callback: (r) => {
				var price = frappe.format(r.message,{'fieldtype':"Currency"})
				console.log(`THe price is ${price}`);
				// Set the total price to received sum from db
				$("#total-price")[0].innerText = (format(r.message))
			}
		})

		let  get_status =  frappe.call({
			method:"estate_app.estate_app.page.estate.estate.get_status",
			callback: (r) => {
				console.log(r.message);

				let statuses = []
				let tPrices = []

				r.message.forEach(item => {
					statuses.push(item[0])
					tPrices.push(item[1])
				});
						// Show the graph
				let new_chart = new frappe.Chart("#chart",{
	
							// or DOM element
					data: {
								labels: statuses,
				
								datasets: [
								{
									name: statuses[0],
									chartType: "bar",
									values: [tPrices[0],0,0]
								},
								{
									name: statuses[1],
									chartType: "bar",
									values: [0,tPrices[0],0]
								},
								{
									name: statuses[2],
									chartType: "bar",
									values: [0,0,tPrices[0]]
								}
								],
				
								yMarkers: [{ label: "Marker", value: 70, options: { labelPos: "left" } }],
								yRegions: [
								{ label: "Region", start: -10, end: 50, options: { labelPos: "right" } }
								]
						},
				
					title: "Status",
					type: "axis-mixed", // or 'bar', 'line', 'pie', 'percentage'
					height: 300,
					colors: ["red", "green", "blue"],
					axisOptions: {
								xAxisMode: "tick",
								xIsSeries: true
					},
					barOptions: {
								stacked: true,
								spaceRatio: 0.5
					},
					tooltipOptions: {
								formatTooltipX: (d) => (d + "").toUpperCase(),
								formatTooltipY: (d) => d + " pts"
					}
				
				});
			}
		})		
	
		
		// total();
		// new_chart();

		//Inject the body to the DOM
		$(frappe.render_template(frappe.estate_app_page.body,this)).appendTo(this.page.main)

		// new_chart();
	}

	
 })

// Create the <body></body> 
 let body = `
		<div class="widget-group ">
				<div class="widget-group-head">
					<div class="widget-group-control"></div>
				</div>
				<div class="widget-group-body grid-col-3">
				<div class="widget         widget-shadow    number-widget-box" data-widget-name="Total Declaration Submitted">
			<div class="widget-head">
				<div>
					<div class="widget-title ellipsis">
					<div class="number-label text-danger">Total Property Price</div></div>
					<div class="widget-subtitle"></div>
				</div>
				<div class="widget-control"><div class="card-actions dropdown pull-right">
				<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				...
				</a>
				<ul class="dropdown-menu" style="max-height: 300px; overflow-y: auto;">
					<li class="dropdown-item">
									<a data-action="action-refresh" id="refresh-total">Refresh</a>
								</li><li class="dropdown-item">
									<a data-action="action-edit">Edit</a>
								</li>
				</ul>
			</div></div>
			</div>
			<div class="widget-body"><div class="widget-content">
				<div class="number" style="color:undefined" id="total-price">
					0
				</div>
				<div class="card-stats grey-stat">
				<span class="percentage-stat-area">
					<span class="percentage-stat">
						NaN %
					</span>
				</span>
				<span class="stat-period text-muted">
					since last month
				</span>
			</div></div></div>
		    <div class="widget-footer">
		    </div>
		</div><div class="widget         widget-shadow    number-widget-box" data-widget-name="Total Salary Structure">
			<div class="widget-head">
				<div>
					<div class="widget-title ellipsis"><div class="number-label">Total Salary Structure</div></div>
					<div class="widget-subtitle"></div>
				</div>
				<div class="widget-control"><div class="card-actions dropdown pull-right">
				<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				...
				</a>
				<ul class="dropdown-menu" style="max-height: 300px; overflow-y: auto;">
					<li class="dropdown-item">
									<a data-action="action-refresh">Refresh</a>
								</li><li class="dropdown-item">
									<a data-action="action-edit">Edit</a>
								</li>
				</ul>
			</div></div>
			</div>
			<div class="widget-body"><div class="widget-content">
				<div class="number" style="color:undefined">0</div>
				<div class="card-stats grey-stat">
				<span class="percentage-stat-area">
					<span class="percentage-stat">
						NaN %
					</span>
				</span>
				<span class="stat-period text-muted">
					since last month
				</span>
			</div></div></div>
		    <div class="widget-footer">
		    </div>
		</div><div class="widget         widget-shadow    number-widget-box" data-widget-name="Total Incentive Given(Last month)">
			<div class="widget-head">
				<div>
					<div class="widget-title ellipsis"><div class="number-label">Total Incentive Given(Last month)</div></div>
					<div class="widget-subtitle"></div>
				</div>
				<div class="widget-control"><div class="card-actions dropdown pull-right">
				<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				...
				</a>
				<ul class="dropdown-menu" style="max-height: 300px; overflow-y: auto;">
					<li class="dropdown-item">
									<a data-action="action-refresh">Refresh</a>
								</li><li class="dropdown-item">
									<a data-action="action-edit">Edit</a>
								</li>
				</ul>
			</div></div>
			</div>
			<div class="widget-body"><div class="widget-content">
				<div class="number" style="color:undefined">₦ 0.00 </div>
				<div class="card-stats grey-stat">
				<span class="percentage-stat-area">
					<span class="percentage-stat">
						NaN %
					</span>
				</span>
				<span class="stat-period text-muted">
					since last month
				</span>
			</div></div></div>
		    <div class="widget-footer">
		    </div>
		</div><div class="widget         widget-shadow    number-widget-box" data-widget-name="Total Outgoing Salary(Last month)">
			<div class="widget-head">
				<div>
					<div class="widget-title ellipsis"><div class="number-label">Total Outgoing Salary(Last month)</div></div>
					<div class="widget-subtitle"></div>
				</div>
				<div class="widget-control"><div class="card-actions dropdown pull-right">
				<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				...
				</a>
				<ul class="dropdown-menu" style="max-height: 300px; overflow-y: auto;">
					<li class="dropdown-item">
									<a data-action="action-refresh">Refresh</a>
								</li><li class="dropdown-item">
									<a data-action="action-edit">Edit</a>
								</li>
				</ul>
			</div></div>
			</div>
			<div class="widget-body"><div class="widget-content">
				<div class="number" style="color:undefined">₦ 0.00 </div>
				<div class="card-stats grey-stat">
				<span class="percentage-stat-area">
					<span class="percentage-stat">
						NaN %
					</span>
				</span>
				<span class="stat-period text-muted">
					since last month
				</span>
			</div></div></div>
		    <div c
lass="widget-footer">
		    </div>
		</div></div>
			</div>
			<div id="frost-chart"></div>
			<div id ="chart"></div>
`;
// link the to frappe
frappe.estate_app_page = {
	body: body
}
