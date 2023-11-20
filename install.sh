cd ./Apps



echo "Installing 'CommonApp'..."
cd ./CommonApp
npm i > /dev/null
cd ..



echo "Installing 'BrokerApp'..."
cd ./BrokerApp
npm i > /dev/null
cd ..



echo "Installing 'OrderApp'..."
cd ./OrderApp
npm i > /dev/null
cd ..



echo "Installing 'PaymentApp'..."
cd ./PaymentApp
npm i > /dev/null
cd ..



echo "Installing 'DeliveryApp'..."
cd ./DeliveryApp
npm i > /dev/null
cd ..

echo "Done!"