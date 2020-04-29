import React from 'react'
import { Link } from 'react-router-dom' 
import styles from './Thread.module.scss'
import Button from '../../../Button/Button'
import ThreadsApiService from '../../../../services/threads-api-service'
import ThreadsContext from '../../../../contexts/ThreadsContext'

export default class Thread extends React.Component {

    static contextType = ThreadsContext

    handleThreadDelete = () => {
        console.log(this.context)
        ThreadsApiService.deleteThread(this.props.thread.id)
        this.context.deleteThread(this.props.thread.id)
    }

    render() {
        const thread = this.props.thread
        const user = this.props.user
        let name = ''
        let user_name = ''
        if (thread.user_id1 === user.id) {
            name = thread.name2
            user_name = thread.user_name2
        }
        else if(thread.user_id1 === user.id) {
            name = thread.name1
            user_name = thread.user_name1
        }

        return (
            <li className={styles.threadLi}>
                <Link to={`/thread/${thread.id}`}>
                    <h3>Thread with {name}({user_name})</h3>
                </Link>
                <Button type='delete' onClick={(e) => {
                    e.preventDefault()
                    this.handleThreadDelete()
                }}>X</Button>
            </li>
        )
    }
}