/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, xml } from "@odoo/owl";

class PostizIframe extends Component {
    static template = xml`
        <div class="o_postiz_iframe_container" style="height: calc(100vh - 50px); width: 100%;">
            <iframe 
                t-att-src="postizUrl" 
                style="width: 100%; height: 100%; border: none;"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-downloads"
                t-on-load="onIframeLoad"
            />
        </div>
    `;
    
    setup() {
        this.postizUrl = "http://localhost:4200";
    }
    
    onIframeLoad() {
        console.log("POSTIZ iframe loaded");
    }
}

registry.category("actions").add("postiz_iframe", PostizIframe);