var connect = require('connect');
/* for now, the quick & dirty method
 *  - startup server
 *  - let the shard library handle everything else
 *
 *  Probably want to have logging, auth, &c &c &c here,
 *  but as a PoC, this is fine
 */
var triplestore = {},
    shard = connect.router(function(app) {
    app.get('/',function(req,res) {
            res.end(JSON.stringify({'subjects': Object.keys(triplestore)}));
    });
    app.get('/:section',function(req,res) {
            if(req.params.section in triplestore){
                res.end({'subject' : Object.keys(triplestore[req.params.section])});
            } else {
                res.end(JSON.stringify({'error': 'no such subject','code':'0'}));
            }
    });
    app.get('/:section/:predicate',function(req,res) {
            if(req.params.section   in triplestore &&
               req.params.predicate in triplestore[req.params.section]) {
                res.end({'predicate' : triplestore[req.params.section][req.params.predicate]});
            } else {
                res.end(JSON.stringify({'error': 'no such subject and/or predicate','code':'1'}));
            }
    });
    app.put('/:section/:predicate',function(req,res) {
            if(req.params.section   in triplestore &&
               req.params.predicate in triplestore[req.params.section]) {
                triplestore[req.params.section][req.params.predicate] = req.body;
                res.end(JSON.stringify({'status':'done'}));
            } else {
                res.end(JSON.stringify({'error': 'no such subject and/or predicate','code':'2'}));
            }
    });
    app.post('/:section',function(req,res){
             triplestore[req.params.section] = {};
             res.end("Done");
    });
    app.post('/:section/:predicate',function(req,res) {
           if(req.params.section in triplestore) {
                triplestore[req.params.section][req.params.predicate] = req.body;
                res.end(JSON.stringify({'status':'done'}));
           } else {
                res.end(JSON.stringify({'error': 'no such subject','code':'3'}));
           }
    });
});
connect().use('/',shard).listen(3157);
