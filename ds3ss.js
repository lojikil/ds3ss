var connect = require('connect');
/* for now, the quick & dirty method
 *  - startup server
 *  - let the shard library handle everything else
 *
 *  Probably want to have logging, auth, &c &c &c here,
 *  but as a PoC, this is fine
 */

var shard = connect.router(function(app) {
    app.get('/',function(req,res) {
            res.end({'subjects': Object.keys(triplestore)});
            });
    app.get('/:section',function(req,res) {
            res.end({req.params.section : Object.keys(triplestore[req.params.section])});
            });
    app.get('/:section/:predicate',function(req,res) {
            res.end({req.params.predicate : triplestore[req.params.section][req.params.predicate]});
            });
    app.put('/:section/:predicate',function(req,res) {
           triplestore[req.params.section][req.params.predicate] = req.body;
           res.end("Done");
           });
    app.post('/:section',function(req,res){
             triplestore[req.params.section] = {};
             res.end("Done");
           });
    app.post('/:section/:predicate',function(req,res) {
           triplestor[req.params.section][req.params.predicate] = req.body;
           res.end("Done");
           });
});
connect().use('/',shard).listen(3157);
