const AUTH_TOKEN = "my_secret_token";

import Fastify from "fastify";
const fastify = Fastify();

fastify.post("/api/event/track", async (request, reply) => {
  const { headers, body } = request;

  // Check if Authorization header with Bearer token exists
  if (!headers.authorization || !headers.authorization.startsWith("Bearer ")) {
    reply.code(401).send({ error: "Unauthorized" });
    return;
  }

  // Extract the token
  const token = headers.authorization.slice(7);

  // Simple token validation (Replace with your actual token validation logic)
  if (token !== AUTH_TOKEN) {
    reply.code(403).send({ error: "Forbidden" });
    return;
  }

  // Log the received request body
  console.log(
    `[${new Date().toUTCString()}]`,
    "New event received:\n",
    body,
    "\n---\n"
  );

  reply.send({ success: true });
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
