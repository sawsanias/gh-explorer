import React from 'react';
import Panel from './Panel';
import ScrollView from './ScrollView';
import FlexView from 'react-flexview';

const Card = ({ title, author, date, children }) => (
  <FlexView className='card'>
    <FlexView shrink basis='100%' className='description'>
      <FlexView column>
        <FlexView className='title'>{title}</FlexView>
        <FlexView className='subtitle'>
          <FlexView className='author'>{author}</FlexView>
          <FlexView className='date'>{date}</FlexView>
        </FlexView>
        {children}
      </FlexView>
    </FlexView>
  </FlexView>
);

export default class SearchResultPanel extends React.Component {

  render() {
    const headerContent = (
      <div> Repositorises </div>
    );

    const panelHeader = {
      title: headerContent
    };

    return (
      <Panel type='floating' header={panelHeader}>
        <ScrollView>
          {this.props.items.map((r, i) => {
            return <Card key={i} title={r.title} author={r.author} date={r.date}>{r.description}</Card>;
          })}
        </ScrollView>
      </Panel>
    );
  }
}
