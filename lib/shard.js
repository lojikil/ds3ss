/* module to handle triples RESTfully. As an initial PoC, there is no
 *  - logging
 *  - disk serialization
 *  - authentication
 *  - bNodes
 *  - URIs
 *
 *  I'll add those things later :D
 *
 *  Initial overview:
 *
 *  - GET / -> return list of subjects
 *  - GET /:subject -> return list of predicates
 *  - GET /:subject/:predicate -> return an object
 *  - PUT /:subject/:predicate -> update an object
 *  - POST /:subject/:predicate -> create a new SPO triple
 *  - DELETE /:subject -> delete the entire subject
 *  - DELETE /:subject/:predicate -> delete a specific Predicate & Object
 */

module.exports = function()
{
    return function(req,res) {

    };
}
