#!/bin/sh
set -e
CONFIG="/var/www/html/config/config.ini.php"
if [ ! -f "$CONFIG" ]; then
    echo "Matomo config not found at $CONFIG, skipping iframe configuration."
    exit 0
fi

if grep -q '^enable_framed_pages' "$CONFIG"; then
    sed -i 's/^enable_framed_pages *= *.*/enable_framed_pages = 1/' "$CONFIG"
else
    echo 'enable_framed_pages = 1' >> "$CONFIG"
fi

if grep -q '^enable_framed_settings' "$CONFIG"; then
    sed -i 's/^enable_framed_settings *= *.*/enable_framed_settings = 1/' "$CONFIG"
else
    echo 'enable_framed_settings = 1' >> "$CONFIG"
fi
