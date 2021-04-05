import React from 'react';
import ItemDetails, { Record } from "../item-details";
import { withSwapiService } from "../hoc-helper";

const PersonDetails = ({ itemId, swapiService }) => {
  const { getPersonImage, getPerson } = swapiService;
  return (
    <ItemDetails
      itemId={itemId}
      getData={getPerson}
      getImageUrl={getPersonImage}
    >
      <Record field="gender" label="Gender" />
      <Record field="eyeColor" label="Eye color" />
    </ItemDetails>
  );
};

export default withSwapiService(PersonDetails);
