import React from "react";
import tw from "twin.macro";
import TabGrid from "components/cards/TabCardGrid.js";


export default () => {
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  return (
      <TabGrid
        heading={
          <>
            Choose your <HighlightedText>SQL.</HighlightedText>
          </>
        }
      />
  );
}
