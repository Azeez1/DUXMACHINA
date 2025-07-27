# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request


class DittofeedController(http.Controller):

    @http.route('/dittofeed/config', type='json', auth='user')
    def get_dittofeed_config(self):
        """Return Dittofeed configuration for the current user."""
        return {
            'dittofeed_url': 'http://localhost:3006',
            'user_name': request.env.user.name,
            'user_email': request.env.user.email,
            'user_id': request.env.user.id,
        }
