from frappe import _


def get_data():
	return {
		"heatmap": True,
		"heatmap_message": _(
			"THeat MAp "
		),
	
		"non_standard_fieldnames": {
			"Property":'agent'
		},
		"transactions": [
			{"label": _("Property"), "items": ["Property"]},
	
		],
	}
