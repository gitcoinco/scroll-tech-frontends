import React, { useEffect, useState } from "react"

import { Box, Container as MuiContainer, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as BuildSvg } from "@/assets/svgs/landingpage/build.svg"
import { ReactComponent as BuildCoverSvg } from "@/assets/svgs/landingpage/build_cover.svg"
import { ReactComponent as ChangeRPCSvg } from "@/assets/svgs/landingpage/change-rpc.svg"
import { ReactComponent as ETHSvg } from "@/assets/svgs/landingpage/eth.svg"
import { FadeInUp } from "@/components/Animation"
import Button from "@/components/Button"
import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionHeader from "@/components/SectionHeader"

const STEPS = [
  {
    icon: ETHSvg,
    title: "Bridge your ETH",
    description: "Bridge your ETH to Scroll using our native bridge or another ecosystem bridge.",
  },
  {
    icon: ChangeRPCSvg,
    title: "Change RPC provider",
    description: "Point your favorite builder tools to a Scroll RPC Provider to configure.",
  },
  {
    icon: BuildSvg,
    title: "Build with your usual dev tools",
    description: "Start building with your favorite toolkit.",
  },
]

const Container = styled(Box)(({ theme }) => ({
  paddingTop: "15.4rem",
  maxWidth: "152rem",
  paddingBottom: "16rem",
  background: "transparent",
  justifyContent: "center",
  position: "relative",
  margin: "0 auto",
  "& .MuiContainer-root": {
    position: "relative",
    maxWidth: "152rem",
  },
  [theme.breakpoints.down("md")]: {
    paddingTop: "5.4rem",
    paddingBottom: "0",
  },
}))

const StyledBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
}))

const StepContainer = styled(SuccessionToView)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "4.8rem",
  // marginBottom: "13rem",
  "& > div:nth-of-type(1) img": {
    width: "2.3rem",
  },
  "& > div:nth-of-type(2) img": {
    width: "3.4rem",
  },
  "& > div:nth-of-type(3) img": {
    width: "3.3rem",
  },
  [theme.breakpoints.down("md")]: {
    rowGap: "5.6rem",
    gridTemplateColumns: "repeat(2, 1fr)",
    marginBottom: "10rem",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    marginBottom: "5.6rem",
    "& > div:nth-of-type(1) img": {
      width: "3.3rem",
    },
    "& > div:nth-of-type(2) img": {
      width: "3.2rem",
    },
    "& > div:nth-of-type(3) img": {
      width: "2.8rem",
    },
  },
}))

const StepBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
}))

const StepTitle = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  color: theme.palette.text.primary,
  marginBottom: "2rem",
  [theme.breakpoints.down("md")]: {
    marginBottom: "1.4rem",
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: "0.8rem",
  },
}))

const StepDescription = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  color: theme.palette.text.primary,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.6rem",
  },
}))

const GetStart = () => {
  const [, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <Container>
      {/* <Background sx={{ width: calculateWidth() }} /> */}
      <FadeInUp>
        <SectionHeader
          sx={{ mb: ["10rem", "12.5rem"] }}
          title="Build with Scroll"
          content="Scroll is compatible with Ethereum at the bytecode-level, meaning everything works right out of the box."
          action={
            <Button href="https://docs.scroll.io/en/home/" target="_blank" color="primary">
              Start building
            </Button>
          }
        ></SectionHeader>
      </FadeInUp>

      <StyledBox>
        <StepContainer>
          {STEPS.map((feature, idx) => (
            <SuccessionItem key={idx}>
              <StepBox className="step-box">
                <SvgIcon
                  sx={{ height: "3.2rem", width: "3.2rem", marginBottom: "0.8rem", objectFit: "contain" }}
                  component={feature.icon}
                  inheritViewBox
                ></SvgIcon>
                <StepTitle variant="H4">{feature.title}</StepTitle>
                <StepDescription variant="Body3">{feature.description}</StepDescription>
              </StepBox>
            </SuccessionItem>
          ))}
        </StepContainer>
        <SvgIcon
          sx={{ objectFit: "contain", height: "100%", width: "auto", textAlign: "right", justifySelf: "end" }}
          component={BuildCoverSvg}
          inheritViewBox
        ></SvgIcon>
      </StyledBox>
    </Container>
  )
}

export default GetStart
