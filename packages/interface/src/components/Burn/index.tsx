import {
  Box,
  BoxProps,
  Button,
  Center,
  Stat,
  StatLabel,
  StatNumber,
  Spinner,
  Flex,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { ArrowDownIcon, SettingsIcon } from "@chakra-ui/icons";
import { ethers } from "ethers";
import useWeb3React from "../../hooks/useWeb3React";
import useSynthetix from "../../hooks/useSynthetix";
import WalletButton from "../NavBar/WalletButton";
import AmountInput from "./AmountInput";
import { formatAmount } from "../../utils";

function Burn({ props }: { props?: BoxProps }): JSX.Element {
  const { provider } = useWeb3React();
  const { balances, loaded } = useSynthetix();
  const {
    rateForCurrency,
    sUSDDecimals,
    balanceOf,
    snxDecimals,
    debtBalanceOf,
  } = balances;

  return (
    <Box {...props}>
      <Flex marginBottom="2">
        <Stat>
          <StatLabel>SNX Price</StatLabel>
          <StatNumber>
            {provider !== undefined ? (
              loaded ? (
                `$${formatAmount(
                  ethers.utils.formatUnits(rateForCurrency, sUSDDecimals)
                )}`
              ) : (
                <>
                  {"$ "}
                  <Spinner size="sm" />
                </>
              )
            ) : (
              "$-"
            )}
          </StatNumber>
        </Stat>
        <Popover id={"popover"}>
          <PopoverTrigger>
            <IconButton
              bg="#06061B"
              marginTop="2"
              border="2px"
              aria-label="Search database"
              icon={<SettingsIcon color="#00D1FF" w={6} h={6} />}
              _hover={{
                bg: "white",
              }}
            />
          </PopoverTrigger>
          <PopoverContent bg="#06061B">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Settings</PopoverHeader>
            <PopoverBody>Coming soon...</PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
      <AmountInput
        badgeText="SNX Balance"
        badgeAmount={
          provider !== undefined
            ? formatAmount(ethers.utils.formatUnits(balanceOf, snxDecimals))
            : "-"
        }
        src="/snx.svg"
        alt="snx"
      />
      <Center margin="2">
        <ArrowDownIcon w={5} h={5} border="1px" rounded="sm" />
      </Center>
      <AmountInput
        badgeText="sUSD Debt"
        badgeAmount={
          provider !== undefined
            ? formatAmount(
                ethers.utils.formatUnits(debtBalanceOf, sUSDDecimals)
              )
            : "-"
        }
        src="/sUSD.svg"
        alt="sUSD"
      />
      <Center marginTop="2">
        {provider !== undefined ? (
          <Button color="black" disabled>
            Burn
          </Button>
        ) : (
          <WalletButton />
        )}
      </Center>
    </Box>
  );
}

export default Burn;
