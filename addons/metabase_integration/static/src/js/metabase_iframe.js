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
                t-if="metabaseUrl"
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
        this.state = useState({ loading: true });
        this.metabaseUrl = useState({});

        onWillStart(async () => {
            await this.loadMetabaseConfig();
        });
    }

    async loadMetabaseConfig() {
        try {
            const config = await this.rpc("/metabase/config", {});
            if (config.metabase_url) {
                this.metabaseUrl.src = config.metabase_url;
            } else {
                throw new Error("Metabase URL not found in config.");
            }
        } catch (error) {
            console.error("Failed to load Metabase configuration:", error);
            this.notification.add("Could not load Metabase configuration from the server.", {
                type: "danger"
            });
            this.state.loading = false;
        }
    }

    onIframeLoad() {
        this.state.loading = false;
        console.log("Metabase iframe loaded successfully");
    }

    onIframeError() {
        this.state.loading = false;
        this.notification.add("Failed to load Metabase. Check service and embedding settings.", {
            type: "danger"
        });
    }
}

registry.category("actions").add("metabase_iframe", MetabaseIframe);