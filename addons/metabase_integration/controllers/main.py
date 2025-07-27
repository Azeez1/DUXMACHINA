# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request


class MetabaseController(http.Controller):

    @http.route('/metabase/config', type='json', auth='user')
    def get_metabase_config(self):
        """Return Metabase configuration for the current user."""
        return {
            'metabase_url': 'http://localhost:3030',
            'user_name': request.env.user.name,
            'user_email': request.env.user.email,
            'user_id': request.env.user.id,
        }

