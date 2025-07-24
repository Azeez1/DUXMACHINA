{
    'name': 'Suna AI Integration',
    'version': '1.0',
    'category': 'Tools',
    'summary': 'Integrate Suna AI generalist agent into Odoo',
    'description': """
        Integrate the Suna AI agent platform into Odoo using an iframe.
    """,
    'author': 'Dux Vitae Capital',
    'website': 'https://www.duxvitaecapital.com',
    'depends': ['base', 'web'],
    'data': [
        'security/ir.model.access.csv',
        'views/suna_iframe_views.xml',
        'views/suna_menu.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'suna_integration/static/src/js/suna_iframe.js',
            'suna_integration/static/src/css/suna_iframe.css',
        ],
    },
    'installable': True,
    'application': True,
    'auto_install': False,
}
