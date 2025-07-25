{
    'name': 'POSTIZ Integration',
    'version': '1.0',
    'category': 'Tools',
    'summary': 'Integrate POSTIZ into Odoo via iframe',
    'description': """
        This module allows you to access POSTIZ directly from within Odoo
        using an iframe integration.
    """,
    'author': 'Dux Vitae Capital',
    'website': 'https://www.duxvitaecapital.com',
    'depends': ['base', 'web'],
    'data': [
        'security/ir.model.access.csv',
        'views/postiz_iframe_views.xml',
        'views/postiz_menu.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'postiz_integration/static/src/js/postiz_iframe.js',
            'postiz_integration/static/src/css/postiz_iframe.css',
        ],
    },
    'installable': True,
    'application': True,
    'auto_install': False,
}