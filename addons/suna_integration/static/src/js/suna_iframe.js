/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, xml, onWillStart, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

class SunaIframe extends Component {
    static template = xml`
        <div class="o_suna_iframe_container">
            <div t-if="state.loading" class="o_suna_loading">
                <i class="fa fa-spinner fa-spin fa-3x"/>
                <p>Loading Suna AI...</p>
            </div>
            <iframe
                t-att-src="sunaUrl"
                class="o_suna_iframe"
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

        // Default Suna URL
        this.sunaUrl = "http://localhost:3001";

        onWillStart(async () => {
            await this.loadSunaConfig();
        });
    }

    async loadSunaConfig() {
        try {
            const config = await this.rpc("/suna/config", {});
            if (config.suna_url) {
                this.sunaUrl = config.suna_url;
            }
        } catch (error) {
            console.error("Failed to load Suna configuration:", error);
            this.notification.add("Failed to load Suna configuration", {
                type: "warning"
            });
        }
    }

    onIframeLoad() {
        this.state.loading = false;
        console.log("Suna iframe loaded successfully");

        window.addEventListener("message", this.handleSunaMessage.bind(this));
    }

    onIframeError() {
        this.state.loading = false;
        this.state.error = true;
        this.notification.add("Failed to load Suna AI. Please check if the service is running.", {
            type: "danger"
        });
    }

    handleSunaMessage(event) {
        if (event.origin !== "http://localhost:3001") return;
        console.log("Message from Suna:", event.data);
    }
}

registry.category("actions").add("suna_iframe", SunaIframe);
