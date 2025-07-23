# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request

@http.route('/n8n/config', type='json', auth='user')
def get_n8n_config(self):
    """
    Return n8n configuration for the current user
    For local dev, using simple localhost URL
    """
    return {
        'n8n_url': 'http://localhost:5678',
        'user_name': request.env.user.name,
        'user_email': request.env.user.email,
        'user_id': request.env.user.id,
    }