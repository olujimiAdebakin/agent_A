import { ToolConfig } from "./allTools";
import { createViemWalletClient } from "../viem/createViemWalletClient";
import erc721Abi from "../abi/ERC721.json"; // Standard ERC721 ABI
import erc721Bytecode from "../bytecode/ERC721Bytecode"; // Compiled ERC721 bytecode

interface DeployErc721Args {
  name: string;
  symbol: string;
  baseUri: string;
}

export const deployErc721Tool: ToolConfig<DeployErc721Args> = {
  definition: {
    type: "function",
    function: {
      name: "deploy_erc721",
      description: "Deploy an ERC721 (NFT) contract",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string" },
          symbol: { type: "string" },
          baseUri: { type: "string" },
        },
        required: ["name", "symbol", "baseUri"],
      },
    },
  },

  handler: async ({ name, symbol, baseUri }) => {
    const client = createViemWalletClient();

    const { contractAddress, transactionHash } = await client.deployContract({
      abi: erc721Abi,
      bytecode: erc721Bytecode,
      args: [name, symbol, baseUri],
    });

    return {
      contractAddress,
      transactionHash,
    };
  },
};
