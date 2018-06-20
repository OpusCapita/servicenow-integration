git clone https://github.com/OpusCapita/duriel.git -b feature/proddeployment ../buildprocess
cd ../buildprocess
npm install
npm test
mv junit ~/build/junit
cd ~/build