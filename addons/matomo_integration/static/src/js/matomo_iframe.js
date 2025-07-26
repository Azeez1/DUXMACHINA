/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, xml, onWillStart, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

class MatomoIframe extends Component {
    static template = xml`
        <div class="o_matomo_iframe_container">
            <div t-if="state.loading" class="o_matomo_loading">
                <i class="fa fa-spinner fa-spin fa-3x"/>
                <p>Loading Matomo analytics...</p>
            </div>
            <iframe
                t-att-src="matomoUrl"
                class="o_matomo_iframe"
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

        // Default Matomo URL
        this.matomoUrl = "http://localhost:8080";

        onWillStart(async () => {
            await this.loadMatomoConfig();
        });
    }

    async loadMatomoConfig() {
        try {
            const config = await this.rpc("/matomo/config", {});
            if (config.matomo_url) {
                this.matomoUrl = config.matomo_url;
            }
        } catch (error) {
            console.error("Failed to load Matomo configuration:", error);
            this.notification.add("Failed to load Matomo configuration", {
                type: "warning"
            });
        }
    }

    onIframeLoad() {
        this.state.loading = false;
        console.log("Matomo iframe loaded successfully");

        window.addEventListener("message", this.handleMatomoMessage.bind(this));
    }

    onIframeError() {
        this.state.loading = false;
        this.state.error = true;
        this.notification.add("Failed to load Matomo. Please check if the service is running.", {
            type: "danger"
        });
    }

    handleMatomoMessage(event) {
        if (event.origin !== "http://localhost:8080") return;
        console.log("Message from Matomo:", event.data);
    }
}

registry.category("actions").add("matomo_iframe", MatomoIframe);
