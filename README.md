Address Book full stack application that has both the react front-end and a spring-boot back-end bundled in a single project to be deployed as a single jar.

The back-end uses JPA to interact with a MySQL database and is wired up with a JPA Listener to listen for CRUD events.

When the JPA-CRUD events are triggered a handler re-publishes them as Persistence-Events to a Reactor-Flux where Reactive Listeners, such as the react front-end, can pick them up.

This is a merge of of addressbook-sse-api  and addressbook-sse-ui  projects based on  server sent events 