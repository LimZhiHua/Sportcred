import React from "react";
import FloatingSection from "../customComponents/FloatingSection";
import { Bracket, RoundProps } from 'react-brackets';
//import { Bracket } from 'react-tournament-bracket';



const rounds = [
    {
      title: 'Round one',
      seeds: [
        {
          id: 1,
          date: new Date().toDateString(),
          teams: [{ name: 'Team A' }, { name: 'Team B' }],
        },
        {
          id: 2,
          date: new Date().toDateString(),
          teams: [{ name: 'Team C' }, { name: 'Team D' }],
        },
      ],
    },
    {
      title: 'Round one',
      seeds: [
        {
          id: 3,
          date: new Date().toDateString(),
          teams: [{ name: 'Team A' }, { name: 'Team C' }],
        },
      ],
    },
  ];

  
const PicksPredictLanding = () => {
    return (
        <FloatingSection>

            <h1>PicksPredictLanding TODO</h1>
            <Bracket rounds={rounds} />;
            
        </FloatingSection>
    )
}

export default PicksPredictLanding;