import React from 'react'
import ThreadsPage from '../../components/ThreadsPage/ThreadsPage'
import ThreadsContext from '../../contexts/ThreadsContext'
import ThreadsApiService from '../../services/threads-api-service'
import MessagesApiService from '../../services/messages-api-service'
import UsersList from '../../components/UsersList/UsersList'

export default class ThreadsRoute extends React.Component {

    static contextType = ThreadsContext

    componentDidMount() {
        this.getThreads();
        this.getMessages();
      }
    
      async getMessages() {
        const messages = await MessagesApiService.getMessages();
        this.context.setMessages(messages);
      }
    
      async getThreads() {
        const threads = await ThreadsApiService.getThreads();
        this.context.setThreads(threads);
      }

    render() {
        return (
            <div>
                <ThreadsPage getUsers={this.getUsers}/>
                <UsersList />
            </div>
        )
    }
}