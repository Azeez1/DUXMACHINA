/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, xml, onWillStart, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

class N8nIframe extends Component {
    static template = xml`
        <div class="o_n8n_iframe_container">
            <div t-if="state.loading" class="o_n8n_loading">
                <i class="fa fa-spinner fa-spin fa-3x"/>
                <p>Loading n8n workflows...</p>
            </div>
            <iframe 
                t-att-src="n8nUrl" 
                class="o_n8n_iframe"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-downloads allow-storage-access-by-user-activation"
                t-on-load="onIframeLoad"
                t-on-error="onIframeError"
            />
        </div>
    `;
    
    setup() {
        this.rpc = useService("rpc");
        this.notification = useService("notification");
        this.state = useState({
            loading: true,
            error: false
        });
        
        // Default n8n URL
        this.n8nUrl = "http://localhost:5678";
        
        onWillStart(async () => {
            await this.loadN8nConfig();
        });
    }
    
    async loadN8nConfig() {
        try {
            const config = await this.rpc("/n8n/config", {});
            if (config.n8n_url) {
                this.n8nUrl = config.n8n_url;
            }
            // Could potentially set auth headers or tokens here
        } catch (error) {
            console.error("Failed to load n8n configuration:", error);
            this.notification.add("Failed to load n8n configuration", {
                type: "warning"
            });
        }
    }
    
    onIframeLoad() {
        this.state.loading = false;
        console.log("n8n iframe loaded successfully");
        
        // Optional: Set up message passing with n8n
        window.addEventListener("message", this.handleN8nMessage.bind(this));
    }
    
    onIframeError() {
        this.state.loading = false;
        this.state.error = true;
        this.notification.add("Failed to load n8n. Please check if n8n is running.", {
            type: "danger"
        });
    }
    
    handleN8nMessage(event) {
        // Handle messages from n8n iframe if needed
        if (event.origin !== "http://localhost:5678") return;
        
        console.log("Message from n8n:", event.data);
        // Implement any custom message handling here
    }
}

registry.category("actions").add("n8n_iframe", N8nIframe);