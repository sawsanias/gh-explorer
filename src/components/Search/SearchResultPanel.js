import React from 'react';
import Panel from '../Panel';
import ScrollView from '../Scroll';
import FlexView from 'react-flexview';
import Button from '../Button';
import RepositoryDetailModal from '../RepositoryDetailModal';

const buttonProps = {
  style: { margin: 10, width: 150 }
};
const Card = ({ title, author, fullname, children, openDetail }) => (
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
      <Button label='More details' onClick={() => openDetail(fullname)} {...buttonProps} />
    </FlexView>
  </FlexView>
);

export default class SearchResultPanel extends React.Component {

  state = { showLowerButton: false, isOpen: false };

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
          return <Card key={i} title={r.name} author={r.owner.login} openDetail={this.open} fullname={r.full_name}>{r.description}</Card>;
        })}
        {this.state.isOpen && this.getModal()}
        {this.state.showLowerButton && <button style={{ position: 'absolute', bottom: 0, right: 0 }} onClick={this.scrollToTop}>
          Go to top
        </button>}
      </div>
    );
  }
  open = (fullname) => {
    this.setState({ isOpen: true });
    console.log(`repos fullname is ${fullname}`);
  }
  close = () => this.setState({ isOpen: false })
  getModal = () => (
    <RepositoryDetailModal closeModal={this.close.bind(this)} />
  )

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
