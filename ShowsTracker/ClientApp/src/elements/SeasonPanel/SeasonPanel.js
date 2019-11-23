import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Panel from 'react-bootstrap/lib/Panel';
import ShowWatchStatus from '../ShowWatchStatus/ShowWatchStatus';
import './SeasonPanel.css';

const SeasonPanel = props => {
  const { season } = props;
  const { loadSeason, loadEpisode, deleteShow, startWatching, completeShow } = props;

  const episodesPanels = [];
  season.episodes.forEach(episode => {
    episodesPanels.push(<EpisodePanel episode={episode} key={episode.imdbID} seasonNumber={season.season} loadEpisode={loadEpisode} 
                          deleteShow={deleteShow} startWatching={startWatching} completeShow={completeShow}/>);
  });

  return (
    <Panel>
      <Panel.Heading>
        <Panel.Title toggle onClick={() => loadSeason(season.season)}>
          Season {season.season}
        </Panel.Title>
      </Panel.Heading>
      <Panel.Collapse>
        <Panel.Body>
          <Panel className="seasons-panel" bsStyle="info">
            <Panel.Body>{episodesPanels}</Panel.Body>
          </Panel>
        </Panel.Body>
      </Panel.Collapse>
    </Panel>
)};

const EpisodePanel = props => {
  const { episode, seasonNumber } = props;
  const { loadEpisode, deleteShow, startWatching, completeShow } = props;

  return (
    <Panel>
      <Panel.Heading>
        <Panel.Title toggle onClick={() => loadEpisode(episode.imdbID, seasonNumber)}>
          Episode {episode.episode}: {episode.title}
        </Panel.Title>
        <Panel.Collapse>
          <Panel.Body>
            <Row>
              <Col md={3}>
                <img src={episode.poster} alt={episode.title} className="poster" />
              </Col>
              <Col md={6}>
                <li><strong>Plot: </strong> {episode.plot}</li>
                <li><strong>Released: </strong> {episode.released}</li>
                <li><strong>Runtime: </strong> {episode.runtime}</li>
                <li><strong>Year: </strong> {episode.year}</li>

                <ShowWatchStatus watchStatus={episode.watchStatus} showId={episode.imdbID} showType={episode.type} deleteShow={deleteShow} startWatching={startWatching} completeShow={completeShow}/>
              </Col>
            </Row>
          </Panel.Body>
        </Panel.Collapse>
      </Panel.Heading>
    </Panel>
)};

export default SeasonPanel;