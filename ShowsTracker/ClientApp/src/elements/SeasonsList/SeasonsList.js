import React from 'react';
import SeasonPanel from '../SeasonPanel/SeasonPanel';
import Panel from 'react-bootstrap/lib/Panel'
import './SeasonsList.css';

const SeasonsList = props => {
  const { seasons } = props;
  const { loadSeason, loadEpisode } = props;

  let seasonPanels = [];
  seasons.forEach(season => {
    seasonPanels.push(<SeasonPanel season={season} loadSeason={loadSeason} loadEpisode={loadEpisode} key={`season${season.season}`} />);
  });

  return (
    <Panel className="seasons-panel" bsStyle="info">
      <Panel.Heading>
        <Panel.Title>Seasons</Panel.Title>
      </Panel.Heading>
      <Panel.Body>{seasonPanels}</Panel.Body>
    </Panel>
)};

export default SeasonsList;