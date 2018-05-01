(cd /node_modules && make)
npm install
sleep 10
swagger project edit -s --host=0.0.0.0 -p 10011 &
swagger project start
