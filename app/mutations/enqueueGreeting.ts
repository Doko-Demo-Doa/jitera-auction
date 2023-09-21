import greetingsQueue from "src/pages/api/greetingsQueue"

export default async function enqueueGreeting() {
  await greetingsQueue.enqueue({
    to: "Sandy Cheeks",
    message: "Howdy!",
  })
}
