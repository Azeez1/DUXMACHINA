/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, xml, onWillStart, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

class MetabaseIframe extends Component {
    static template = xml`
        <div class="o_metabase_iframe_container">
            <div t-if="state.loading" class="o_metabase_loading">
                <i class="fa fa-spinner fa-spin fa-3x"/>
                <p>Loading Metabase...</p>
            </div>
            <iframe
                t-att-src="metabaseUrl"
                class="o_metabase_iframe"
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

        // Default Metabase URL
        this.metabaseUrl = "http://localhost:3030";

        onWillStart(async () => {
            await this.loadMetabaseConfig();
        });
    }

    async loadMetabaseConfig() {
        try {
            const config = await this.rpc("/metabase/config", {});
            if (config.metabase_url) {
                this.metabaseUrl = config.metabase_url;
            }
        } catch (error) {
            console.error("Failed to load Metabase configuration:", error);
            this.notification.add("Failed to load Metabase configuration", {
                type: "warning"
            });
        }
    }

    onIframeLoad() {
        this.state.loading = false;
        console.log("Metabase iframe loaded successfully");

        window.addEventListener("message", this.handleMetabaseMessage.bind(this));
    }

    onIframeError() {
        this.state.loading = false;
        this.state.error = true;
        this.notification.add("Failed to load Metabase. Please check if the service is running.", {
            type: "danger"
        });
    }

    handleMetabaseMessage(event) {
        if (event.origin !== "http://localhost:3030") return;
        console.log("Message from Metabase:", event.data);
    }
}

registry.category("actions").add("metabase_iframe", MetabaseIframe);
