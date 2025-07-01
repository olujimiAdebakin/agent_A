import { createPublicClients, http } from 'viem'
import { abstractTestnet } from 'viem/chains'


export function createViemPublicClient() {

    const createViemPublicClients = createPublicClients({
        chain: mainnet,
        transport: http()
    })
}

