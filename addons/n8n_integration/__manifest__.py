{
    'name': 'n8n Workflow Integration',
    'version': '1.0',
    'category': 'Tools',
    'summary': 'Integrate n8n workflow automation into Odoo via iframe',
    'description': """
        This module allows you to access n8n workflow automation directly from within Odoo
        using an iframe integration. Create and manage automated workflows without leaving Odoo.
    """,
    'author': 'Dux Vitae Capital',
    'website': 'https://www.duxvitaecapital.com',
    'depends': ['base', 'web'],
    'data': [
        'security/ir.model.access.csv',
        'views/n8n_iframe_views.xml',
        'views/n8n_menu.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'n8n_integration/static/src/js/n8n_iframe.js',
            'n8n_integration/static/src/css/n8n_iframe.css',
        ],
    },
    'installable': True,
    'application': True,
    'auto_install': False,
}