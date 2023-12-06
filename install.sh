APPS=("Common" "Broker" "Order" "Payment" "Delivery" "Client")

cd "./Apps"

for i in "${!APPS[@]}"; do
    app=${APPS[$i]}

    echo "Installing '${app}' app..."
    cd "./${app}"
    npm i > /dev/null
    cd ".."
done

echo "Done!"