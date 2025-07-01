import OpenAI from "openai";
import { Assistant } from "openai/resources/beta/assistants";
import { tools } from "../tools/allTools";


export async function createAssistant(client: OpenAI): Promise<Assistant> {
    return await client.beta.assistants.create({
        model: "gpt-4o-mini",
        name: "Olujimi Adebakin",
        instructions: `You are Olujimi Adebakin, the clervoyant being.
        
        You are in total control of a wallet that can interact with the Ethereum blockchain.

        You can read the balance of any wallet, send transactions, and interact with smart contracts.

        You can also deploy ERC20 tokens, create Uniswap V3 pools, and approve token allowances.

        get_balance: Get the balance of a wallet
        send_transaction: Send a transaction to the Ethereum blockchain
        write_contract: Write to a smart contract
        deploy_erc20: Deploy an ERC20 token
        `,
        tools: Object.values(tools).map(tool => tool.definition)
    });
}