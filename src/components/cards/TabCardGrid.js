import React, { useState } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw(SectionHeading)``;
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;

const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${props => props.active && tw`bg-primary-500! text-gray-100!`}
  }
`;

const TabContent = tw(motion.div)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm`;

const handleButtonClick = async (sqlurl) => {
  try {
    const response = await fetch(sqlurl);
    const sqlContent = await response.text();
    navigator.clipboard.writeText(sqlContent);
    console.log("SQL file copied to clipboard");
  } catch (error) {
    console.error("Error downloading and copying SQL file:", error);
  }
};

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const SQLS = {
  Diagnostics: [
    {
      imageSrc:
        "https://endlessicons.com/wp-content/uploads/2013/02/wrench-icon.png",
      title: "Management Activity Error",
      content: "Diagnose Redlight System Errors",
      rawsqlurl: "https://raw.githubusercontent.com/lichfiet/sqlLibrary/main/diagnostics/management%20activity/managementActivityError.sql",
      sqlurl: "https://github.com/lichfiet/sqlLibrary/blob/main/diagnostics/management%20activity/managementActivityError.sql"
    },
    {
      imageSrc:
        "https://endlessicons.com/wp-content/uploads/2013/02/wrench-icon.png",
      title: "Accounting Health Check",
      content: "Check common accounting issues",
      url: "#"
    },
    {
      imageSrc:
        "https://endlessicons.com/wp-content/uploads/2013/02/wrench-icon.png",
      title: "TBA",
      content: "TBA",
      url: "#"
    }
  ],
  Updates: [
    {
      imageSrc:
        "https://cdn3.iconfinder.com/data/icons/simple-files-1/128/Update-512.png",
      title: "TBA",
      content: "TBA",
      url: "#"
    },
  ],
  Tools: [
    {
      imageSrc:
        "https://st3.depositphotos.com/12229170/17110/v/450/depositphotos_171103234-stock-illustration-screwdriver-solid-icon-build-repair.jpg",
      title: "TBA",
      content: "TBA",
      url: "#"
    },
  ],
  Information: [
    {
      imageSrc:
        "https://endlessicons.com/wp-content/uploads/2013/02/wrench-icon.png",
      title: "TBA",
      content: "TBA",
      url: "#"
    },
  ],
}


export default ({
  heading = "Choose Your SQL",
  tabs = {
    All: [...SQLS.Diagnostics, ...SQLS.Updates, ...SQLS.Tools, ...SQLS.Information],
    Diagnostics: SQLS.Diagnostics,
    Updates: SQLS.Updates,
    Tools: SQLS.Tools,
    Information: SQLS.Information
  }
}) => {
  /*
   * To customize the tabs, pass in data using the `tabs` prop. It should be an object which contains the name of the tab
   * as the key and value of the key will be its content (as an array of objects).
   * To see what attributes are configurable of each object inside this array see the example above for "Starters".
   */
  const tabsKeys = Object.keys(tabs);
  const [activeTab, setActiveTab] = useState(tabsKeys[0]);

  return (
    <Container>
      <ContentWithPaddingXl>
        <HeaderRow>
          <Header>{heading}</Header>
          <TabsControl>
            {Object.keys(tabs).map((tabName, index) => (
              <TabControl key={index} active={activeTab === tabName} onClick={() => setActiveTab(tabName)}>
                {tabName}
              </TabControl>
            ))}
          </TabsControl>
        </HeaderRow>

        {tabsKeys.map((tabKey, index) => (
          <TabContent
            key={index}
            variants={{
              current: {
                opacity: 1,
                scale:1,
                display: "flex",
              },
              hidden: {
                opacity: 0,
                scale:0.8,
                display: "none",
              }
            }}
            transition={{ duration: 0.4 }}
            initial={activeTab === tabKey ? "current" : "hidden"}
            animate={activeTab === tabKey ? "current" : "hidden"}
          >
            {tabs[tabKey].map((card, index) => (
              <CardContainer key={index}>
                <Card className="group" initial="rest" whileHover="hover" animate="rest">
                  <CardImageContainer imageSrc={card.imageSrc}>
                      <CardHoverOverlay
                        variants={{
                          hover: {
                            opacity: 1,
                            height: "auto"
                          },
                          rest: {
                            opacity: 0,
                            height: 0
                          }
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardButton onClick={() => {handleButtonClick(card.rawsqlurl) }}>Copy SQL</CardButton>
                      </CardHoverOverlay>
                  </CardImageContainer>
                  <CardText>
                    <CardTitle href={card.sqlurl}>{card.title}</CardTitle>
                    <CardContent>{card.content}</CardContent>
                    <a href={card.sqlurl}>Link To Github</a>
                  </CardText>
                </Card>
              </CardContainer>
            ))}
          </TabContent>
        ))}
      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};