import { NavLink } from "react-router-dom";
import * as React from "react";
import {
  CloseRounded,
  OpenInNew,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import {
  Collapse,
  Box,
  SwipeableDrawer,
  List,
  ListItemButton,
  Link,
  Button,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import navigations from "./constans";

const NavStack = styled(Stack)(
  ({ theme }) => `
  line-height: 69px;
  border-bottom: 1px solid ${theme.palette.border.main};
  padding-left: 16px;
  padding-right: 16px;
`
);

const LinkStyledButton = styled(NavLink)(
  ({ theme }) => `
  &.active {
    color: ${theme.palette.action.active}
  } 
`
);

const ExternalLink = styled(Link)(
  ({ theme }) => `
  color: ${theme.palette.text.primary}
  `
);

const ListButton = styled(ListItemButton)(
  ({ theme }) => `
  font-weight: 600;
  padding-top: 20px;
  padding-bottom: 20px;
`
);

const MenuContent = styled(Box)(
  ({ theme }) => `
      width: 280px;
      padding-top: 10px;
      padding-right: 10px;
`
);

const App = () => {
  const [open, setOpen] = React.useState(false);
  const [activeCollapse, setActiveCollapse] = React.useState("");

  const toggleDrawer = (open: boolean) => {
    setOpen(open);
  };

  const toggleCollapse = (collapse: string) => {
    setActiveCollapse(collapse === activeCollapse ? "" : collapse);
  };

  const list = () => (
    <List
      sx={{
        width: "100%",
        paddingLeft: "20px",
      }}
      component="nav"
    >
      {navigations.map((item) => {
        if (item.href) {
          return (
            <ListButton onClick={() => toggleDrawer(false)}>
              {item.isExternal ? (
                <ExternalLink underline="none" href={item.href}>
                  {item.label}
                </ExternalLink>
              ) : (
                <LinkStyledButton to={item.href}>{item.label}</LinkStyledButton>
              )}
            </ListButton>
          );
        }
        return (
          <>
            <ListButton onClick={() => toggleCollapse(item.key)}>
              {item.label}{" "}
              {activeCollapse === item.key ? (
                <ExpandLess sx={{ marginLeft: "6px" }} />
              ) : (
                <ExpandMore sx={{ marginLeft: "6px" }} />
              )}
            </ListButton>
            <Collapse
              in={activeCollapse === item.key}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {item.children?.map((subItem) =>
                  subItem.isExternal ? (
                    <ListButton
                      onClick={() => toggleDrawer(false)}
                      sx={{ pl: 4 }}
                    >
                      <ExternalLink underline="none" href={subItem.href}>
                        {subItem.label}
                      </ExternalLink>
                      <OpenInNew sx={{ fontSize: 14, marginLeft: "10px" }} />
                    </ListButton>
                  ) : (
                    <ListButton
                      onClick={() => toggleDrawer(false)}
                      sx={{ pl: 4 }}
                    >
                      <LinkStyledButton to={subItem.href}>
                        {subItem.label}
                      </LinkStyledButton>
                    </ListButton>
                  )
                )}
              </List>
            </Collapse>
          </>
        );
      })}
    </List>
  );

  return (
    <NavStack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Link href="/" className="flex">
        <img
          src="https://scroll.io/img/logo_with_text.png"
          alt="logo"
          className="cursor-pointer w-[96px] h-auto"
        />
      </Link>
      <Box>
        <MenuIcon onClick={() => toggleDrawer(true)} />
        <SwipeableDrawer
          open={open}
          anchor="right"
          onClose={() => toggleDrawer(false)}
          onOpen={() => toggleDrawer(true)}
        >
          <MenuContent
            role="presentation"
            onKeyDown={() => toggleDrawer(false)}
          >
            <Stack sx={{ alignItems: "end" }}>
              <CloseRounded onClick={() => toggleDrawer(false)} />
            </Stack>
            {list()}
            <Button
              sx={{ marginTop: "32px", marginLeft: "36px" }}
              href="https://guide.scroll.io/"
            >
              User Guide
            </Button>
          </MenuContent>
        </SwipeableDrawer>
      </Box>
    </NavStack>
  );
};

export default App;
