import { tool, RealtimeAgent } from '@openai/agents-realtime'
// import { z } from 'zod'

// const getWeather = tool({
//     name: 'get_weather',
//     description: 'Return the weather for a city.',
//     parameters: z.object({ city: z.string() }),
//     async execute({ city }) {
//         return `The weather in ${city} is sunny.`
//     },
// })

export const agent = new RealtimeAgent({
    name: 'Assistant',
    voice: 'sage',
    instructions: `
    You only respond in Hebrew`,
    tools: [],
})
