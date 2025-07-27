/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, xml, onWillStart, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

class DittofeedIframe extends Component {
    static template = xml`
        <div class="o_dittofeed_iframe_container">
            <div t-if="state.loading" class="o_dittofeed_loading">
                <i class="fa fa-spinner fa-spin fa-3x"/>
                <p>Loading Dittofeed...</p>
            </div>
            <iframe
                t-if="dittofeedUrl"
                t-att-src="dittofeedUrl"
                class="o_dittofeed_iframe"
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
        this.dittofeedUrl = useState({});

        onWillStart(async () => {
            await this.loadDittofeedConfig();
        });
    }

    async loadDittofeedConfig() {
        try {
            const config = await this.rpc("/dittofeed/config", {});
            if (config.dittofeed_url) {
                this.dittofeedUrl.src = config.dittofeed_url;
            } else {
                throw new Error("Dittofeed URL not found in config.");
            }
        } catch (error) {
            console.error("Failed to load Dittofeed configuration:", error);
            this.notification.add("Could not load Dittofeed configuration from the server.", {
                type: "danger"
            });
            this.state.loading = false;
        }
    }

    onIframeLoad() {
        this.state.loading = false;
        console.log("Dittofeed iframe loaded successfully");
    }

    onIframeError() {
        this.state.loading = false;
        this.notification.add("Failed to load Dittofeed. Check service and embedding settings.", {
            type: "danger"
        });
    }
}

registry.category("actions").add("dittofeed_iframe", DittofeedIframe);
