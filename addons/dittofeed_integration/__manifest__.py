{
    'name': 'Dittofeed Engagement Platform',
    'version': '1.0',
    'category': 'Tools',
    'summary': 'Integrate Dittofeed customer engagement platform into Odoo via iframe',
    'description': """
        This module integrates Dittofeed, a customer engagement platform for multi-channel messaging automation, directly into Odoo using an iframe.
    """,
    'author': 'Dux Vitae Capital',
    'website': 'https://www.duxvitaecapital.com',
    'depends': ['base', 'web'],
    'data': [
        'security/ir.model.access.csv',
        'views/dittofeed_iframe_views.xml',
        'views/dittofeed_menu.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'dittofeed_integration/static/src/js/dittofeed_iframe.js',
            'dittofeed_integration/static/src/css/dittofeed_iframe.css',
        ],
    },
    'sequence': 55,
    'installable': True,
    'application': True,
    'auto_install': False,
}
