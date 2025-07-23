# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request

class PostizController(http.Controller):
    
    @http.route('/postiz/config', type='json', auth='user')
    def get_postiz_config(self):
        """
        Return POSTIZ configuration for the current user
        Can be extended to pass user info, tokens, etc.
        """
        return {
            'postiz_url': 'http://localhost:3000',
            'user_name': request.env.user.name,
            'user_email': request.env.user.email,
            # Add any other configuration needed
        }