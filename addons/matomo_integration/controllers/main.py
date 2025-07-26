# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request


@http.route('/matomo/config', type='json', auth='user')
def get_matomo_config(self):
    """Return Matomo configuration for the current user."""
    return {
        'matomo_url': 'http://localhost:8080',
        'user_name': request.env.user.name,
        'user_email': request.env.user.email,
        'user_id': request.env.user.id,
    }
