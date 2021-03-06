var connect = require('connect'),
    util    = require('util');
/* for now, the quick & dirty method
 *  - startup server
 *  - let the shard library handle everything else
 *
 *  Probably want to have logging, auth, &c &c &c here,
 *  but as a PoC, this is fine
 */
function collateBody()
{
    function bodyCollation(req,res,next)
    {
        if(!req.body)
        {
            var data = '';
            req.on('data',function(chunk) { data += chunk; });
            req.on('end',function bcOn()
            {
                if(data != '')
                {
                    req.body = data;
                }
                next();
            });
        }
        else
        {
            next();
        }
    }
    return bodyCollation;
}
var triplestore = {},
    predicates  = {},
    shard       = connect.router(function(app) {
    app.get('/',function(req,res) {
            if('predicate' in req.params)
            {
                if(req.params.predicate in predicates)
                {
                    res.end(JSON.stringify({'subjects':predicates[req.params.predicate]}));
                } else {
                    res.end(JSON.stringify({'subjects':[]}));
                }
            } else {
                res.end(JSON.stringify({'subjects': Object.keys(triplestore)}));
            }
    });
    app.get('/:section',function(req,res) {
            if(req.params.section in triplestore){
                res.end(JSON.stringify({'subject' : Object.keys(triplestore[req.params.section])}));
            } else {
                res.end(JSON.stringify({'error': 'no such subject','code':'0'}));
            }
    });
    app.get('/:section/:predicate',function(req,res) {
            if(req.params.section   in triplestore &&
               req.params.predicate in triplestore[req.params.section]) {
                res.end(JSON.stringify({'predicate' : triplestore[req.params.section][req.params.predicate]}));
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
                res.end(JSON.stringify({'error': 'no suhc subject and/or predicate','code':'2'}));
            }
    });
    app.post('/:section',function(req,res){
             triplestore[req.params.section] = {};
             res.end(JSON.stringify({'status':"done"}));
    });
    app.post('/:section/:predicate',function(req,res) {
           if(req.params.section in triplestore) {
                triplestore[req.params.section][req.params.predicate] = req.body;
                predicates[req.params.predicate] = req.params.section;
                res.end(JSON.stringify({'status':'done'}));
           } else {
                triplestore[req.params.section] = {};
                triplestore[req.params.section][req.params.predicate] = req.body;
                res.end(JSON.stringify({'status':'done'}));
           }
    });
});
connect(collateBody()).use('/',shard).listen(3157);
