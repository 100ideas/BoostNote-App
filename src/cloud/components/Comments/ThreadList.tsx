import React, { useMemo } from 'react'
import ThreadItem, { ThreadListItemProps } from './ThreadItem'
import { Comment, Thread } from '../../interfaces/db/comments'
import { sortBy } from 'ramda'
import {
  highlightComment,
  unhighlightComment,
} from '../../../design/lib/utils/comments'
import styled from '../../../design/lib/styled'
import { SerializedUser } from '../../interfaces/db/user'

interface ThreadListProps extends Omit<ThreadListItemProps, 'thread'> {
  threads: Thread[]
  updateComment: (comment: Comment, message: string) => Promise<any>
  addReaction: (comment: Comment, emoji: string) => Promise<any>
  removeReaction: (comment: Comment, reactionId: string) => Promise<any>
  user?: SerializedUser
}

function ThreadList({
  threads,
  onSelect,
  onDelete,
  users,
  updateComment,
  addReaction,
  removeReaction,
  user,
}: ThreadListProps) {
  const sorted = useMemo(() => {
    return sortBy((thread) => thread.lastCommentTime, threads).reverse()
  }, [threads])

  return (
    <Container>
      {sorted.map((thread) => (
        <div
          key={thread.id}
          onMouseOver={highlightComment(thread.id)}
          onMouseOut={unhighlightComment(thread.id)}
          className='thread__list__item'
        >
          <ThreadItem
            thread={thread}
            onSelect={onSelect}
            onDelete={onDelete}
            users={users}
            updateComment={updateComment}
            addReaction={addReaction}
            removeReaction={removeReaction}
            user={user}
          />
        </div>
      ))}
    </Container>
  )
}

const Container = styled.div`
  & > div {
    &:hover {
      background-color: ${({ theme }) => theme.colors.background.secondary};
    }
  }
`

export default ThreadList
