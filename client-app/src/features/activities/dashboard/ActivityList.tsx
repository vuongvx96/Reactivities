import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Item, Segment, Button, Label } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/ActivityStore'

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore)
  const { activitiesByDate, selectActivity, submitting, target, deleteActivity } = activityStore
  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectActivity(activity.id)}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  name={activity.id}
                  loading={target === activity.id && submitting}
                  onClick={(e) => deleteActivity(e, activity.id)}
                  floated='right'
                  content='Delete'
                  color='red'
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  )
}

export default observer(ActivityList)