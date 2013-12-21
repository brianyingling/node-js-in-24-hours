http = require 'http'

http.createServer (req, res) ->
  res.writeHead 200, 'Content-Type':'text/plain'
  res.end 'Hello World\n'
.listen 3001, '127.0.0.1'

console.log 'Server running at 127.0.0.1:3001'