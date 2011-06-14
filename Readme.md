##Dead Simple Triple Shard Server##

A simple triple (subject predicate object) server, that is meant to act as a shard in a larger
cluster of servers. The client library takes care of asking each server if it has the data, as 
well as only storing data on one server (I assume that something like MarkLogic&apos;s E-node 
server will be in front of these shards).

###Current status###

This is just meant as a PoC; as such, there is much to do:

 - bNodes
 - URI support
 - efficient serialization of data to disk

