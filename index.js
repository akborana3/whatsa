import { Boom } from '@hapi/boom'
import NodeCache from 'node-cache'
import makeWASocket, { AnyMessageContent, delay, DisconnectReason, fetchLatestBaileysVersion, getAggregateVotesInPollMessage, makeCacheableSignalKeyStore, makeInMemoryStore, PHONENUMBER_MCC, proto, useMultiFileAuthState, WAMessageContent, WAMessageKey } from '../src'
import MAIN_LOGGER from '../src/Utils/logger'
// import open from 'open' // Uncomment this if needed
// import fs from 'fs' // Uncomment this if needed

const logger = MAIN_LOGGER.child({})
logger.level = 'trace'

const useStore = !process.argv.includes('--no-store')
const doReplies = !process.argv.includes('--no-reply')
const usePairingCode = process.argv.includes('--use-pairing-code')
const useMobile = process.argv.includes('--mobile')

// external map to store retry counts of messages when decryption/encryption fails
// keep this out of the socket itself, so as to prevent a message decryption/encryption loop across socket restarts
const msgRetryCounterCache = new NodeCache()

// the store maintains the data of the WA connection in memory
// can be written out to a file & read from it
const store = useStore ? makeInMemoryStore({ logger }) : undefined
store?.readFromFile('./baileys_store_multi.json')
// save every 10s
setInterval(() => {
    store?.writeToFile('./baileys_store_multi.json')
}, 10_000)

// start a connection
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const sock = await startSock();
            res.status(200).json({ message: 'Connection established successfully' });
        } catch (error) {
            console.error('Error while starting connection:', error);
            res.status(500).json({ message: 'Failed to establish connection' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}

async function startSock() {
    // Your existing code for starting the connection goes here...
}

async function getMessage(key: WAMessageKey): Promise<WAMessageContent | undefined> {
    // Your existing code for retrieving messages goes here...
                              }
