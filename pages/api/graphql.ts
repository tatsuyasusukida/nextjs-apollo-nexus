import { ApolloServer } from 'apollo-server-micro'
import type { NextApiRequest, NextApiResponse, PageConfig } from 'next'
import schema from '../../api/schema'

const server = new ApolloServer({ schema })
const serverHandler = server.start()
  .then(() => server.createHandler({ path: '/api/graphql' }))

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'content-type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  await (await serverHandler)(req, res)
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}
