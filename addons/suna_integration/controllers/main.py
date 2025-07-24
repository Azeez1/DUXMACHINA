# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request


@http.route('/suna/config', type='json', auth='user')
def get_suna_config(self):
    """Return Suna AI configuration for the current user."""
    return {
        'suna_url': 'http://localhost:3001',
        'user_name': request.env.user.name,
        'user_email': request.env.user.email,
        'user_id': request.env.user.id,
    }
