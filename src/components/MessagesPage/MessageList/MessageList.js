import React from 'react';
import Message from './Message/Message';
import ThreadsContext from '../../../contexts/ThreadsContext';
import styles from './MessageList.module.scss';

export default class MessageList extends React.Component {
  static contextType = ThreadsContext;

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }

  handleMessageDelete = message => {
    this.context.deleteMessage(message);
  };

  render() {
    const { messages, currentThread } = this.context;
    let name = ''
    let user_name = ''
    console.log(currentThread)
    console.log(this.props.user)
    if (currentThread) {
        if(currentThread.user_id1 === this.props.user.id) {
            name = currentThread.name2
            user_name = currentThread.user_name2
        }
        else if(currentThread.user_id1 !== this.props.user.id) {
            name = currentThread.name1
            user_name = currentThread.user_name1
        }
    }

    // if (!currentThread) {
    //   return <> </>;
    // }

    return (
      <>
        <h2 className={styles.messagesWithHeader}>Thread with {name} ({user_name})</h2>
        <ul className={styles.messageListUl}>
          {messages.map(message => (
            <Message
              key={message.id}
              message={message}
              currentThread={currentThread}
              handleMessageDelete={this.handleMessageDelete}
            />
          ))}
          <div
            ref={el => {
              this.el = el;
            }}
          />
        </ul>
      </>
    );
  }
}
