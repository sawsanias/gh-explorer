import React from 'react';
import Panel from '../Panel';
import ScrollView from '../Scroll';
import FlexView from 'react-flexview';
import Button from '../Button';

const buttonProps = {
  style: { margin: 10, width: 150 }
};
const Card = ({ title, author, children, openDetail }) => (
  <FlexView className='card'>
    <FlexView grow className='description'>
      <FlexView column>
        <FlexView className='title'>{title}</FlexView>
        <FlexView className='subtitle'>
          <FlexView className='author'>{author}</FlexView>
        </FlexView>
        {children}
      </FlexView>
    </FlexView>
    <FlexView grow vAlignContent='center' hAlignContent='right'>
      <Button label='More details' onClick={() => openDetail(author, title)} {...buttonProps} />
    </FlexView>
  </FlexView>
);

export default class SearchResultPanel extends React.Component {

  state = { showLowerButton: false };

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }
  showButtons = (event) => {
    this.setState({ showLowerButton: event.nativeEvent.target.scrollTop > 100 });
  }

  scrollToTop = () => {
    this.scrollTo(0, 0, 500);
  }

  getContent = () => {
    return (
      <div>
        {this.props.items.map((r, i) => {
          return <Card key={i} title={r.name} author={r.owner.login} openDetail={this.goToDetail}>{r.description}</Card>;
        })}
        {this.state.showLowerButton && <button style={{ position: 'absolute', bottom: 0, right: 0 }} onClick={this.scrollToTop}>
          Go to top
        </button>}
      </div>
    );
  }
  goToDetail = (o, r) => {
    this.context.router.transitionTo('/search/detail/:owner/:repos', { owner: o, repos: r }, { query: this.context.router.getCurrentQuery().query });
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
