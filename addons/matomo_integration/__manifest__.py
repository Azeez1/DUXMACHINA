{
    'name': 'Matomo Analytics Integration',
    'version': '1.0',
    'category': 'Tools',
    'summary': 'Integrate Matomo analytics platform into Odoo via iframe',
    'description': """
        This module allows you to access the Matomo analytics platform directly from within Odoo
        using an iframe integration.
    """,
    'author': 'Dux Vitae Capital',
    'website': 'https://www.duxvitaecapital.com',
    'depends': ['base', 'web'],
    'data': [
        'security/ir.model.access.csv',
        'views/matomo_iframe_views.xml',
        'views/matomo_menu.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'matomo_integration/static/src/js/matomo_iframe.js',
            'matomo_integration/static/src/css/matomo_iframe.css',
        ],
    },
    'installable': True,
    'application': True,
    'auto_install': False,
}
