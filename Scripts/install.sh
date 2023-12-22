#!/bin/bash

# Get the directory containing the script
dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Change the current directory to the apps directory
cd "$dir/../Apps"

APPS=("Common" "Broker" "Order" "Payment" "Delivery")

for i in "${!APPS[@]}"; do
    app=${APPS[$i]}

    echo "Installing '${app}' app..."
    cd "./${app}"
    npm i > /dev/null
    cd ".."
done

echo "Done!"