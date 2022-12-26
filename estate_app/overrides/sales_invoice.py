import frappe
from erpnext.accounts.doctype.sales_invoice.sales_invoice import SalesInvoice



class SalesInvoiceCustom(SalesInvoice):
    """
        Inherit core sales invoice and extend it.
    """

    def get_crypto_prices(self):
        # frappe._dict(cg.get_price(ids=['bitcoin', 'ethereum'], vs_currencies=self.currency))

        return 'Working'