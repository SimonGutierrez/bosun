const makeSchoolDashboardData = ({ name, id, lastDate }) => {
  return {
    name,
    id,
    lastDate,
    steps: [
      {
        name: "Submit Transcripts",
        suggestedDate: "2022-08-21",
        status: "notStarted",
      },
      {
        name: "Take GMAT",
        suggestedDate: "2022-08-30",
        status: "notStarted",
      },
      {
        name: "Ask for Recommendation Letters",
        suggestedDate: "2022-08-15",
        status: "notStarted",
      },
      {
        name: "Submit Recommendation Letters",
        suggestedDate: "2022-08-22",
        status: "notStarted",
      },
      {
        name: "Submit Essay 1",
        suggestedDate: "2022-08-25",
        status: "notStarted",
      },
      {
        name: "Submit Essay 2",
        suggestedDate: "2022-08-27",
        status: "notStarted",
      },
      {
        name: "Submit Essay 3",
        suggestedDate: "2022-08-29",
        status: "notStarted",
      },
      {
        name: "Schedule Interview",
        suggestedDate: "2022-09-03",
        status: "notStarted",
      },
      {
        name: "Ace Interview",
        suggestedDate: "2022-09-10",
        status: "notStarted",
      },
    ],
  };
};

export default makeSchoolDashboardData;
