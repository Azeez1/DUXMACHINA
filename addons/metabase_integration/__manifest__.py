{
    'name': 'Metabase Business Intelligence',
    'version': '1.0',
    'category': 'Tools',
    'summary': 'Integrate Metabase business intelligence platform into Odoo via iframe',
    'description': """
        This module allows you to access the Metabase dashboards and analytics directly from within Odoo using an iframe integration.
    """,
    'author': 'Dux Vitae Capital',
    'website': 'https://www.duxvitaecapital.com',
    'depends': ['base', 'web'],
    'data': [
        'security/ir.model.access.csv',
        'views/metabase_iframe_views.xml',
        'views/metabase_menu.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'metabase_integration/static/src/js/metabase_iframe.js',
            'metabase_integration/static/src/css/metabase_iframe.css',
        ],
    },
    'installable': True,
    'application': True,
    'auto_install': False,
}
