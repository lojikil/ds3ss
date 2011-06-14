var connect = require('connect'),
    shard   = require('./lib/shard.js'),
    app = connect.createServer();
/* for now, the quick & dirty method:
 *  - startup server
 *  - let the shard library handle everything else
 *
 *  Probably want to have logging, auth, &c &c &c here,
 *  but as a PoC, this is fine
 */
app.use("/",shard()).listen(3157);
