import React from 'react';
import Panel from '../Panel';
import ScrollView from '../Scroll';
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

  state = { showLowerButton: false };

  showButtons = (event) => {
    this.setState({ showLowerButton: event.nativeEvent.target.scrollTop > 0 });
  }

  scrollToTop = () => {
    this.scrollTo(0, 0, 500);
  }

  getContent = () => {
    return (
      <div>
        {this.props.items.map((r, i) => {
          return <Card key={i} title={r.title} author={r.author} date={r.date}>{r.description}</Card>;
        })}
        {this.state.showLowerButton && <button style={{ position: 'absolute', bottom: 0, right: 0 }} onClick={this.scrollToTop}>
          Go to top
        </button>}
      </div>
    );
  }
  render() {
    const headerContent = (
      <div> Repositorises </div>
    );

    const panelHeader = {
      title: headerContent
    };

    return (
      <Panel type='floating' header={panelHeader}>
        <ScrollView
          easing='easeInOutQuad'
          scrollX={false}
          scrollPropagation={false}
          onScroll={this.showButtons}
        >
          {(scrollTo) => {
            this.scrollTo = scrollTo;
            return this.getContent();
          }}
        </ScrollView>




      </Panel>
    );
  }
}
