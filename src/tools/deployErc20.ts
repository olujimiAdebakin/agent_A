import { ToolConfig } from "./allTools";
import { createViemWalletClient } from "../viem/createViemWalletClient";
import { parseUnits } from "viem";
import erc20Abi from "../abi/ERC20.json";
import erc20Bytecode from "../bytecode/ERC20Bytecode";

interface DeployErc20Args {
  name: string;
  symbol: string;
  supply: string; // e.g., "1000000"
  decimals: number; // e.g., 18
}

export const deployErc20Tool: ToolConfig<DeployErc20Args> = {
  definition: {
    type: "function",
    function: {
      name: "deploy_erc20",
      description: "Deploy a custom ERC20 token",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string" },
          symbol: { type: "string" },
          supply: { type: "string" },
          decimals: { type: "number" },
        },
        required: ["name", "symbol", "supply", "decimals"],
      },
    },
  },

  handler: async ({ name, symbol, supply, decimals }) => {
    const client = createViemWalletClient();

    const initialSupply = parseUnits(supply, decimals);

    const { contractAddress, transactionHash } = await client.deployContract({
      abi: erc20Abi,
      bytecode: erc20Bytecode,
      args: [initialSupply, name, symbol, decimals],
    });

    return {
      contractAddress,
      transactionHash,
    };
  },
};
