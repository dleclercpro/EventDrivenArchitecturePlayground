cd ./Apps



echo "Installing 'Common' app..."
cd ./Common
npm i > /dev/null
cd ..



echo "Installing 'Broker' app..."
cd ./Broker
npm i > /dev/null
cd ..



echo "Installing 'Order' app..."
cd ./Order
npm i > /dev/null
cd ..



echo "Installing 'Payment' app..."
cd ./Payment
npm i > /dev/null
cd ..



echo "Installing 'Delivery' app..."
cd ./Delivery
npm i > /dev/null
cd ..

echo "Done!"