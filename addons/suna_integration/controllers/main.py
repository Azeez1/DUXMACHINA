# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request


class SunaController(http.Controller):

    @http.route('/suna/config', type='json', auth='user')
    def get_suna_config(self):
        """Return Suna AI configuration for the current user."""
        return {
            'suna_url': 'http://localhost:3000/dashboard',
            'user_name': request.env.user.name,
            'user_email': request.env.user.email,
            'user_id': request.env.user.id,
        }
