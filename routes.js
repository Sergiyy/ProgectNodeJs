const fs = require('fs');

const requestHandler =(req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button>Send</button></form></body>')
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => { //прийшла інформація записали 
            console.log(chunk);//<Buffer 6d 65 73 73 61 67 65 3d 48 65 6c 6c 6f>
            body.push(chunk);// додали у body
        });
        req.on('end', () => { //інформації більше нема передаєм дальше
            const parsedBody = Buffer.concat(body).toString();//message=Hello
            const message = parsedBody.split('=')[1];//Hello
            fs.writeFileSync('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>')
    res.write('</html>');
    res.end();
}

// module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText ='Some hard coder text';

exports.handler = requestHandler;
exports.someText ='Some hard coder text';

