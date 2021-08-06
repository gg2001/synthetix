import Head from "next/head";
import { Box, Grid, GridItem, Center } from "@chakra-ui/react";
import { siteURL } from "../constants";
import { Header } from "../components/Header";
import Layout from "../components/layout";
import Loading from "../components/Loading";
import { Info, Data } from "../components/Balances";
import Burn from "../components/Burn";

const pageTitle: string = "SNX Flash Tool - Burn sUSD Debt with Staked SNX";
const pageDescription: string = "Burn sUSD Debt with Staked SNX";
const pageURL: string = siteURL;

function Home(): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:url" content={pageURL} />
        <meta property="og:description" content={pageDescription} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:url" content={pageURL} />
        <meta name="twitter:description" content={pageDescription} />
      </Head>
      <Box p={2}>
        <Header>Burn sUSD Debt with Staked SNX</Header>
        <Loading>
          <Info props={{ justifyContent: "center" }} />
          <Box display={{ base: "none", md: "flex" }} margin="10">
            <Grid width="full" templateColumns="repeat(3, 1fr)">
              <GridItem colSpan={2}>
                <Burn />
              </GridItem>
              <GridItem colSpan={1}>
                <Data />
              </GridItem>
            </Grid>
          </Box>
          <Box display={{ base: "flex-col", md: "none" }} margin="10">
            <Burn />
            <Center>
              <Data props={{ justifyContent: "center", marginTop: "10" }} />
            </Center>
          </Box>
        </Loading>
      </Box>
    </Layout>
  );
}

export default Home;
